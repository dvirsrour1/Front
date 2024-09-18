import React, {Component, useState} from 'react';
import {Buffer} from "node:buffer";
import './css_files/Main.css';
import './UserAddingPopup'
import UserAddingPopup from "./UserAddingPopup";
import UpdateUserPopup from "./UpdateUserPopup";
import TaskAddingPopup from "./TaskAddingPopup";
import DeleteUserPopup from "./DeleteUserPopup";
import DeleteTaskPopup from "./DeleteTaskPopup";
import Table, {Button, Tab, TabPane} from "react-bootstrap";
import axios from "axios";
import {WritableStream} from "node:stream/web";
import TableComponent from "./TableComponent";

export const Main  =() =>{
    const [showUsersTable, setShowUsersTable] = useState(false);
    const [closeUsersTable, setCloseUsersTable] = useState(false);
    function CloseUsersTable(){
           setCloseUsersTable(!closeUsersTable);
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
    function ButtonShow() {
        setShowUsersTable(!showUsersTable);
        console.log(showUsersTable);
    }
        return (
            <React.Fragment>
                <div className="All-App">
                    {showUsersTable ?<button className="button btn_of_closing" onClick={CloseUsersTable} id='CloseButton'>Close Table Button</button>: null}
                    <h1 className="Header" id='Header' style={{
                        animation: showUsersTable ? "Header_animation_allUsers_true 2s forwards" : "Header_animation 2s forwards, Flow_animation 3s forwards",
                        color: "coral"
                    }}>Welcome to our HTTP System!</h1>
                    <div className="container" id='Container' style={{
                        animationName: showUsersTable ? "container_animation" : "",
                        animationDuration: "2s",
                        animationFillMode: "forwards",
                        animationIterationCount: "1"
                    }}>
                        <UserAddingPopup></UserAddingPopup>
                        <TaskAddingPopup></TaskAddingPopup>
                        <button className="button" onClick={ButtonShow} id='ShowUsersButton'><span>Show all Users</span></button>
                        <button className="button"><span>Show all Tasks</span></button>
                        <DeleteUserPopup></DeleteUserPopup>
                        <DeleteTaskPopup></DeleteTaskPopup>
                        <UpdateUserPopup></UpdateUserPopup>
                    </div>
                    {showUsersTable ?
                    <div id='Table'>
                     <TableComponent></TableComponent>
                    </div>: null}
                </div>
            </React.Fragment>
        );
}


export default Main;
