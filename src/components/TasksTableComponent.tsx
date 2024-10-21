import React, {useEffect, ChangeEvent} from 'react';
import './css_files/Table.css'
import {getTasksFromStore} from "./Redux/Store";

interface Task{
    taskName: string;
    idOfUser: number;
    taskDescription: string;
} //Task interface
interface ArrayOfUsers{
    TaskArray: Array<Task>;
    showTable: number;
    searchBarText: string;
    TaskArrayHelper: Array<Task>;
} //ArrayOfUsers interface


export const TasksTableComponent = () => {
    //const's
    const state: ArrayOfUsers = {
        showTable: 1,
        TaskArray: getTasksFromStore(),
        searchBarText: "",
        TaskArrayHelper: []
    }
    const [showState, setState] = React.useState(state);


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setState((prevState) =>({
            ...prevState,
            searchBarText: e.target.value
        }))
    } //searchBarText handler
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
    } //shows only the searched Tasks when the search button clicked
    useEffect(() => {
        if(showState.TaskArrayHelper.length > 0)
        {
            setState((prevState) =>({
                ...prevState,
                TaskArray: getTasksFromStore()
            }))
        }
    }, [showState.searchBarText]); //if the search bar is empty - shows evert task again
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