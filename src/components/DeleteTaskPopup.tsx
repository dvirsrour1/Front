import React, {ChangeEvent} from 'react';
import Modal from "react-bootstrap/Modal";
import userIcon from "./user.png";
import {Button} from "react-bootstrap";
import {deleteTask, deleteTasksFromServer} from "./Redux/Reducer";
import {getStatus, useAppDispatch} from "./Redux/Store";
import {useDispatch} from "react-redux";

interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    nameOfTaskState: string;
} // State interface
interface nameOfTaskObject{
    nameOfTask: string;
} // nameOfTaskObject interface

export const DeleteTaskPopup =()=>{
    const state: State = {
        isModalOpen: false,
        thereIsAnError: false,
        nameOfTaskState: '',
    }
    const [showState, setState] = React.useState(state)
    const dispatchAsync = useAppDispatch();
    const dispatch = useDispatch();
    const StateOfStore = getStatus();

    const handleNameOfTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState((prevState) =>({
            ...prevState,
            nameOfTaskState: event.target.value

        }))
    } // NameOfTask handler
    const openClosePopup = () =>{
        setState((prevState) =>({
            ...prevState,
            isModalOpen: !showState.isModalOpen

        }))
    }
    const oneOrMoreParameterAreNull = ():boolean =>{
        return showState.nameOfTaskState === '';

    } //check if all the parameter fulfilled
    const checkStateAndSubmit = () => {
        if (oneOrMoreParameterAreNull()) {
            setState((prevState)=>({
                ...prevState,
                thereIsAnError: false
            }))
        } else {

            const nameOfTaskObject: nameOfTaskObject = {
                nameOfTask: showState.nameOfTaskState
            }
            dispatchAsync(deleteTasksFromServer(nameOfTaskObject));
            if(StateOfStore !== 'rejected')
            {
                dispatch(deleteTask(nameOfTaskObject));
            }
        }
    } // submitting
    return (
        <React.Fragment>
            <button className="button" onClick={openClosePopup}><span>Delete a Task</span></button>


            <Modal show={showState.isModalOpen} onHide={openClosePopup}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <form>
                        <img src={userIcon} alt="Logo" height='40px' width='40px' className={'img'}/>
                        <div className='div-spaces'></div>
                        <div className='div-spaces'></div>
                        <div className='div'></div>
                        <div className='div-spaces'></div>
                        <h1 className={'text-of-titles'}>Name of Task:</h1>
                        <div className='div-spaces'></div>
                        <input type='text' className='input-group-text style-adding-to-text' value={showState.nameOfTaskState} onChange={handleNameOfTaskChange} ></input>
                        <div className='div-spaces'></div>
                        <div className={'div-of-Error'}
                             style={{visibility: showState.thereIsAnError ? 'visible' : 'hidden'}}>Task name is Incorrect</div>

                    </form>
                </Modal.Body>
                <Button onClick={checkStateAndSubmit}>
                    Submit
                </Button>
            </Modal>
        </React.Fragment>
    );

}
