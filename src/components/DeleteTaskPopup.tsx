import React, {ChangeEvent, Component} from 'react';
import Modal from "react-bootstrap/Modal";
import userIcon from "./user.png";
import {Button} from "react-bootstrap";
import axios from "axios";
import {deleteTask, deleteTasksFromServer, showlist} from "./Redux/Reducer";
import {getStatus, useAppDispatch} from "./Redux/Store";
import {useDispatch, useSelector} from "react-redux";

interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    nameOfTaskState: string;
}

interface nameOfTaskObject{
    nameOfTask: string;
}

export const DeleteTaskPopup =()=>{
    const state: State = {
        isModalOpen: false,
        thereIsAnError: false,
        nameOfTaskState: '',
    }
    const [showState, setState] = React.useState(state)
    const handleNameOfTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState((prevState) =>({
            ...prevState,
            nameOfTaskState: event.target.value

        }))
    }
    const dispatchAsync = useAppDispatch();
    const dispatch = useDispatch();
    const StateOfStore = getStatus();
    const ChangeState = () =>{
        setState((prevState) =>({
            ...prevState,
            isModalOpen: !showState.isModalOpen

        }))
    }

    const somethingIsNull = ():boolean =>{
        if(showState.nameOfTaskState=== '')
        {
            return true
        }
        return false
    }
    const PrintAndChangeState = () => {
        if (somethingIsNull()) {
            setState((prevState)=>({
                ...prevState,
                thereIsAnError: false
            }))
        }

        else {

            const nameOfTaskObject: nameOfTaskObject = {
                nameOfTask: showState.nameOfTaskState
            }
            dispatchAsync(deleteTasksFromServer(nameOfTaskObject));
            if(StateOfStore !== 'rejected')
            {
                dispatch(deleteTask(nameOfTaskObject));
            }
           // axios.delete(`http://localhost:9090/DeleteTask`, {data: nameOfTaskObject}).then(response => {
           //     alert(response.data)
           // }).catch(error => {
           //     console.log(error.message)
           // })
           // setState((prevState)=>({
           //     ...prevState,
           //     isModalOpen: false

           // }))
        }
        {/*fix the Error functionality.*/}
    }
    return (
        <React.Fragment>
            <button className="button" onClick={ChangeState}><span>Delete a Task</span></button>


            <Modal show={showState.isModalOpen} onHide={ChangeState}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <form>
                        <img src={userIcon} alt="Logo" height='40px' width='40px' className={'img'}/>
                        <div className='div-spaces'></div>
                        <div className='div-spaces'></div>
                        <div className='div'></div>
                        {/*<Modal.Title className={'modal-title'}>New User</Modal.Title>*/}
                        <div className='div-spaces'></div>
                        <h1 className={'text-of-titles'}>Name of Task:</h1>
                        <div className='div-spaces'></div>
                        <input type='text' className='input-group-text style-adding-to-text' value={showState.nameOfTaskState} onChange={handleNameOfTaskChange} ></input>
                        <div className='div-spaces'></div>
                        <div className={'div-of-Error'}
                             style={{visibility: showState.thereIsAnError ? 'visible' : 'hidden'}}>Task name is Incorrect</div>

                    </form>
                </Modal.Body>
                <Button onClick={PrintAndChangeState}>
                    Submit
                </Button>
            </Modal>
        </React.Fragment>
    );

}
