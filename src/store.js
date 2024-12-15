// src/store.js
import { createStore, combineReducers } from 'redux';
import LoginReducer from './reducers/LoginReducers';

const rootReducer = combineReducers({
    login: LoginReducer,
});

const store = createStore(rootReducer);

export default store;
