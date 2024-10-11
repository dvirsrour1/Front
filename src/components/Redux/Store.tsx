import reducer from './Reducer'
import {configureStore, createStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const store = configureStore({
    reducer: {
        users: reducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;