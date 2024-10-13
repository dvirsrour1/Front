import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./components/Main";
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "./components/Redux/Store";
import {getTasks, getUsers} from "./components/Redux/Reducer";

function App() {
    const dispatch = useAppDispatch();
    useEffect(() =>{
        dispatch(getUsers())
        dispatch(getTasks())
        console.log('everything is set.')
    },[])
  return (
    <div className="App">
        <Main></Main>
    </div>
  );
}

export default App;
