// src/reducers/loginReducer.js
const initialState = {
    userName: '',
    userPassword: '',
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                userName: action.payload,

            };
        case 'SET_USERPASSWORD':
            return {
                ...state,
                userPassword: action.payload,
            };
        default:
            return state;
    }
};

export default LoginReducer;
