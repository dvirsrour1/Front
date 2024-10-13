import React, {useEffect, Component, useState, ChangeEvent} from 'react';
import axios from "axios";
import './css_files/Table.css'
import {useDispatch, useSelector} from "react-redux";
import {getTasksFromStore, useAppDispatch} from "./Redux/Store";
import {getStateStatus, getTasks} from "./Redux/Reducer";
import App from "../App";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;
interface Task{
    taskName: string;
    idOfUser: number;
    taskDescription: string;
}
interface User{
    name: string;
    id: string;
    description: string;
}
interface AppState {
    users: Array<User>,
    tasks: Array<Task>,
    status: string,
    error: boolean
}


interface ArrayOfUsers{
    TaskArray: Array<Task>;
    showTable: number;
    searchBarText: string;
    TaskArrayHelper: Array<Task>;
}

export const TasksTableComponent = () => {
    const state: ArrayOfUsers = {
        showTable: 1
        ,TaskArray: getTasksFromStore(),
        searchBarText: "",
        TaskArrayHelper: []
    }
    const [showState, setState] = React.useState(state);
// add search button
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setState((prevState) =>({
            ...prevState,
            searchBarText: e.target.value
        }))
    }

    const searchButtonClicked = () => {
        for(let i = 0; i < showState.TaskArray.length; i++){
            if(showState.TaskArray[i].taskName == showState.searchBarText)
            {
                showState.TaskArrayHelper.push(showState.TaskArray[i]);
            }
        }
        setState((prevState) =>({
            ...prevState,
            TaskArray: showState.TaskArrayHelper
        }))
    }

    useEffect(() => {
        if(showState.TaskArrayHelper.length > 0)
        {
            setState((prevState) =>({
                ...prevState,
                TaskArray: getTasksFromStore()
            }))
        }
    }, [showState.searchBarText]);
    return (
        <React.Fragment>
            <div className='search'>
                <input className='input-group-text input-search' onChange={handleInputChange}/>
                <button className={'search-button'} onClick={searchButtonClicked}>SEARCH</button>
            </div>
            <div className='div-spaces'/>
            <div className='div-spaces'></div>
            <div className='scrollit'>
                <table className="table table_style">
                    <thead>
                    <tr className='tr'>
                        <th className="col">#</th>
                        <th className="col">Name</th>
                        <th className="col">Id</th>
                        <th className="col">Description</th>
                    </tr>
                    </thead>
                    {showState.TaskArray.map((Task, index) => (
                        <thead className="thead-dark">
                        <tr key={index}>
                            <th>{index}</th>
                            <td>{Task.taskName}</td>
                            <td>{Task.idOfUser}</td>
                            <td>{Task.taskDescription}</td>
                        </tr>
                        </thead>
                    ))}
                </table>
            </div>
        </React.Fragment>
    );
}