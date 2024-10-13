import React, {useEffect, Component, ChangeEvent} from 'react';
import './css_files/Table.css'
import store, {getUsersFromStore, useAppDispatch} from "./Redux/Store";
import {getUsers} from "./Redux/Reducer";
interface User{
    name: string;
    id: string;
    description: string;
}

interface ArrayOfUsers{
    UsersArray: Array<User>;
    UsersArrayHelper: Array<User>;
    showTable: number;
    searchBerText: any;
}

export const TableComponent= () =>{
    const dispatch = useAppDispatch();
    const State: ArrayOfUsers = {
        showTable: 1
        ,UsersArray: getUsersFromStore(),
        UsersArrayHelper:[],
        searchBerText: ""
    }
    const [showState, setState] = React.useState(State);
    useEffect(() => {
        setState((prevState) =>({
            ...prevState,
            UsersArray: getUsersFromStore()
        }))
    },[showState.showTable])

    useEffect(() =>{
        if(showState.searchBerText === ''){
            setState((prevState) => ({
                ...prevState,
                UsersArray: getUsersFromStore(),
                UsersArrayHelper:[]
            }))

        }
    }, [showState.searchBerText])


    const inputChange =(e: ChangeEvent<HTMLInputElement>) => {
        setState((prevState) =>({
            ...prevState,
            searchBerText: e.target.value
        }))
    }

    const searchButtonClicked = () => {
        showState.UsersArray.map((User)=>{
            if(User.name===showState.searchBerText)
            {
                showState.UsersArrayHelper.push(User)
            }
        })
        setState((prevState) =>({
            ...prevState,
            UsersArray: showState.UsersArrayHelper
        }))
    }

    return (
        <React.Fragment>
            <div className='div-spaces' />
            <div className='search'>
                <input className='input-group-text input-search' onChange={inputChange}/>
                <button className={'search-button'} onClick={searchButtonClicked}>SEARCH</button>
            </div>
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
                    {showState.UsersArray.map((User, index) => (
                        <thead className="thead-dark">
                        <tr key={User.id}>
                            <th>{index}</th>
                            <td>{User.name}</td>
                            <td>{User.id}</td>
                            <td>{User.description}</td>
                        </tr>
                        </thead>
                    ))}
                </table>
            </div>
        </React.Fragment>
    );

}