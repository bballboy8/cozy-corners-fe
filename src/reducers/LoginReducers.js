// src/reducers/loginReducer.js
const initialState = {
    userName: '',
    userPassword: '',
    token: '', // Added token to the state
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
        case 'SET_TOKEN': // New action type for token
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

export default LoginReducer;
