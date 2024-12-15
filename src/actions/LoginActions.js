// src/actions/loginActions.js
export const setUserName = (userName) => {
    return {
        type: 'SET_USERNAME',
        payload: userName,
    };
};

export const setUserPassword = (userPassword) => {
    return {
        type: 'SET_USERPASSWORD',
        payload: userPassword,
    };
};
