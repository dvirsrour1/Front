import React, {useEffect, Component, useState} from 'react';
import axios from "axios";
import './css_files/Table.css'
interface Task{
    taskName: string;
    idOfUser: string;
    taskDescription: string;
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

    useEffect(() => {
        axios.get("http://localhost:9090/Tasks").then((response) => {
            setState((prevState) =>({
                ...prevState,
                TaskArray: response.data
            }))

            console.log(showState.TaskArray);
        }).catch((error) => {
            console.log(error);
        })
    },[showState.showTable])
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