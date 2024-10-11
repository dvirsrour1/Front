import React, {Component, useCallback, useState} from 'react';
import {Buffer} from "node:buffer";
import './css_files/Main.css';
import './UserAddingPopup'
import Table, {Button, Tab, TabPane} from "react-bootstrap";
import axios from "axios";
import {WritableStream} from "node:stream/web";
import {TaskAddingPopup} from "./TaskAddingPopup";
import {UserAddingPopup} from "./UserAddingPopup";
import {UpdateUserPopup} from "./UpdateUserPopup";
import {TasksTableComponent} from "./TasksTableComponent";
import {TableComponent} from "./TableComponent";
import {DeleteUserPopup} from "./DeleteUserPopup";
import {DeleteTaskPopup} from "./DeleteTaskPopup";

export const Main  =() =>{
    const [showUsersTable, setShowUsersTable] = useState(false);
    const [showTasksTable, setShowTasksTable] = useState(false);

    function CloseTable(){
        const Header = document.getElementById('Header') as HTMLElement;
                Header.style.animationName = 'Header_animation_allUsers_false'
                const Table = document.getElementById('Table') as HTMLElement;
                Table.style.animationName = 'Table_animation'
                Table.style.animationDuration = '2s'
                Table.style.display = 'none'
                const divAllButtons = document.getElementById('Container') as HTMLElement;
                divAllButtons.style.animationName = 'container_animation_back'
                const closeButton = document.getElementById('CloseButton') as HTMLElement;
                closeButton.style.animationName = 'btn_of_closing_Clicked'
                closeButton.style.animationDuration = '2s'
                closeButton.style.animationIterationCount = 'forwards'
                closeButton.style.animationFillMode = '1'

    }


    function ShowUsersTable(type: any) {
        if(type === 'USER')
        {
            setShowUsersTable(!showUsersTable);
            setShowTasksTable(false);
        }
        else if(type === 'TASK')
        {
            setShowTasksTable(!showTasksTable);
            setShowUsersTable(false);

        }
    }

        return (
            <React.Fragment>
                <div className="All-App">

                    {(showUsersTable || showTasksTable) ?<button className="button btn_of_closing" onClick={CloseTable} id='CloseButton'>Close Table Button</button>: null}

                    <h1 className="Header" id='Header' style={{
                        animation: (showUsersTable || showTasksTable) ? "Header_animation_allUsers_true 2s forwards" : "Header_animation 2s forwards, Flow_animation 3s forwards",
                        color: "coral"
                    }}>Welcome to our HTTP System!</h1>

                    <div className="container" id='Container' style={{
                        animationName: (showUsersTable || showTasksTable) ? "container_animation" : "",
                        animationDuration: "2s",
                        animationFillMode: "forwards",
                        animationIterationCount: "1"
                    }}>

                        <UserAddingPopup />
                        <TaskAddingPopup />
                        <button className="button" onClick={() =>ShowUsersTable('USER')} id='ShowUsersButton'><span>Show all Users</span></button>
                        <button className="button" onClick={() =>ShowUsersTable('TASK')}><span>Show all Tasks</span></button>
                        <DeleteUserPopup />
                        <DeleteTaskPopup />
                        <UpdateUserPopup />
                    </div>

                    {showUsersTable ?
                    <div id='Table'>
                     <TableComponent />
                    </div>: null}

                    {showTasksTable?
                    <div id='Table'>
                        <TasksTableComponent />
                    </div> :null}
                </div>
            </React.Fragment>
        );
}


export default Main;
