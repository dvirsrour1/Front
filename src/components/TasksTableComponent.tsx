import React, {useEffect, Component, useState} from 'react';
import axios from "axios";
import './css_files/Table.css'
import {useDispatch, useSelector} from "react-redux";
import {useAppDispatch} from "./Redux/Store";
import {getStateStatus, getTasks, getTasksFromState} from "./Redux/Reducer";
import App from "../App";
interface Task{
    taskName: string;
    idOfUser: string;
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
}

export const TasksTableComponent = () => {
    const state: ArrayOfUsers = {
        showTable: 1
        ,TaskArray: []
    }
    const [showState, setState] = React.useState(state);
    const dispatch = useAppDispatch();
    const StoreStatesTasks = useSelector((initialState: AppState) => initialState.tasks);
    const StoreStatesStatus = useSelector(getStateStatus)
// add search button
    return (
        <React.Fragment>
            <div className='div-spaces'/>
            <input className='input-group-text input-search'/>
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
                    {StoreStatesTasks.map((Task, index) => (
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