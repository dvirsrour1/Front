import React, {Component} from 'react';
import {Buffer} from "node:buffer";
import './css_files/Main.css';
import './userPopUp'
import UserPopUp from "./userPopUp";
class Main extends Component {
    render() {
        return (
            <React.Fragment>
                <h1 className="Header">Welcome to our HTTP System!</h1>
                <UserPopUp></UserPopUp>
                <button className="button"><span>See all Users</span></button>
                <button className="button"><span>See all Tasks</span></button>
                <button className="button"><span>Delete a User</span></button>
                <button className="button"><span>Delete a Task</span></button>
                <button className="button"><span>Update a User</span></button>
            </React.Fragment>
        );
    }

}

export default Main;
