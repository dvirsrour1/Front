import React, {Component} from 'react';
import {Buffer} from "node:buffer";
import './css_files/Main.css';
import './UserAddingPopup'
import UserAddingPopup from "./UserAddingPopup";
import UpdateUserPopup from "./UpdateUserPopup";
import TaskAddingPopup from "./TaskAddingPopup";
import DeleteUserPopup from "./DeleteUserPopup";
import DeleteTaskPopup from "./DeleteTaskPopup";
class Main extends Component {
    render() {
        return (
            <React.Fragment>

                <h1 className="Header">Welcome to our HTTP System!</h1>
                <UserAddingPopup></UserAddingPopup>
                <TaskAddingPopup></TaskAddingPopup>
                <button className="button"><span>See all Users</span></button>
                <button className="button"><span>See all Tasks</span></button>
                <DeleteUserPopup></DeleteUserPopup>
                <DeleteTaskPopup></DeleteTaskPopup>
                <UpdateUserPopup></UpdateUserPopup>
            </React.Fragment>
        );
    }

}

export default Main;
