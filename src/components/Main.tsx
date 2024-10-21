import React, {useState} from 'react';
import './css_files/Main.css';
import './UserAddingPopup'
import {TaskAddingPopup} from "./TaskAddingPopup";
import {UserAddingPopup} from "./UserAddingPopup";
import {UpdateUserPopup} from "./UpdateUserPopup";
import {TasksTableComponent} from "./TasksTableComponent";
import {TableComponent} from "./TableComponent";
import {DeleteUserPopup} from "./DeleteUserPopup";
import {DeleteTaskPopup} from "./DeleteTaskPopup";
import {useAppDispatch} from "./Redux/Store";
import {getTasks, getUsers} from "./Redux/Reducer";

export const Main  =() =>{
    //const's
    const [showUsersTable, setShowUsersTable] = useState(false);
    const [showTasksTable, setShowTasksTable] = useState(false);
    const [showClosingButtonClicked, setShowClosingButtonClicked] = useState("Header_animation 2s forwards, Flow_animation 3s forwards");
    const dispatch = useAppDispatch();

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

        setTimeout(()=>{
            if(showUsersTable)
                setShowUsersTable(false);
            if(showTasksTable)
                setShowTasksTable(false);
        }, 2500)
        setShowClosingButtonClicked("Header_animation 0s forwards")
    } //animation function when a Table get closed


    function ShowUsersTable(type: string) {
        if(type == 'USER')
        {
            dispatch(getUsers)
            setShowUsersTable(true);
            setShowTasksTable(false);
        }
        else if(type == 'TASK')
        {
            dispatch(getTasks)
            setShowTasksTable(true);
            setShowUsersTable(false);

        }
    } //Table show

        return (
            <React.Fragment>
                <div className="All-App">

                    {(showUsersTable || showTasksTable) ?<button className="button btn_of_closing" onClick={CloseTable} id='CloseButton'>Close Table Button</button>: null}

                    <h1 className="Header" id='Header' style={{
                        animation: (showUsersTable || showTasksTable) ? "Header_animation_allUsers_true 2s forwards" : showClosingButtonClicked,
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
