import { AsyncStorage } from "react-native";

// export const LOGIN = "LOGIN_USER";
// export const SIGN_UP = "SIGN_UP";
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const signUp = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWlUMi9x4tCyMw6yqR1nJ_E_W5e7-WeMM",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );
   let resData = await response.json();
   console.log(resData);
    if (!response.ok) {
      throw new Error("Something went wrong!!");
    }
    // resData = await response.json();
    // console.log(resData);
    persitAuth(resData.idToken, resData.localId, resData.expiresIn);
    dispatch(createLogoutTimeInterval(resData.expiresIn*1000))
    dispatch({
      type: AUTHENTICATE,
      token: resData.idToken,
      userId: resData.localId
    });
  };
};

const persitAuth = (token, userId, expirationTime) => {
    expirationTime = new Date().getMilliseconds() +  parseInt(expirationTime)*1000
  AsyncStorage.setItem(
    "userData",
    JSON.stringify({
      token,
      userId,
      expirationTime
    })
  );
};

export const logout = () => {
    if(timer) {
        clearTimeout(timer);
    }
    AsyncStorage.removeItem('userData');
    return {type:LOGOUT}
}

export const login = (email, password) => {
  return async dispatch => {
    response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWlUMi9x4tCyMw6yqR1nJ_E_W5e7-WeMM",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!!");
    }
    resData = await response.json();
    persitAuth(resData.idToken, resData.localId, resData.expiresIn);
    console.log(resData);
    dispatch(createLogoutTimeInterval(resData.expiresIn*1000))
    dispatch({ type: AUTHENTICATE, token: resData.idToken, userId: resData.localId });
  };
};

export const createLogoutTimeInterval = (expiresIn) =>{
    return dispatch => {
        time = setTimeout(()=>{
            dispatch(logout())
        },expiresIn)
    }
    
    
}

export const authenticate = (token,userId,expirationTimer) => {
    return dispatch => {
        dispatch(createLogoutTimeInterval(expirationTimer));
        dispatch({type:AUTHENTICATE,token,userId})
    }
}
