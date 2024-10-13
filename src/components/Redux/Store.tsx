import reducer from './Reducer'
import {configureStore, createStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        users: reducer,
    },
});

export const getTasksFromStore = () =>{
    return store.getState().users.tasks;
}
export const getUsersFromStore = () =>{
    return store.getState().users.users;
}
export const getError = () =>{
    return store.getState().users.error;
}

export const getStatus = () =>{
    return store.getState().users.status;
}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;