// src/actions/LoginActions.js

export const setUserName = (userName) => ({
    type: 'SET_USERNAME',
    payload: userName,
});

export const setUserPassword = (userPassword) => ({
    type: 'SET_USERPASSWORD',
    payload: userPassword,
});

export const setToken = (token) => ({
    type: 'SET_TOKEN',
    payload: token,
});
