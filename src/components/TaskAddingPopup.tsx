import React, {Component, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import './css_files/Popup.css'
import userIcon from './user.png'
import {addTask, addTasksToServer} from "./Redux/Reducer";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "./Redux/Store";

interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    idOfUser: string;
    nameOfTask: string;
    description: string;
    errorMessage: string;
} // State interface
interface Task{
    taskName: string;
    idOfUser: number;
    taskDescription: string;
} // Task interface


export const TaskAddingPopup  =() => {
    {
        //const's
        const State: State = {
            thereIsAnError: false,
            isModalOpen: false,
            nameOfTask: '',
            description: '',
            idOfUser: '',
            errorMessage: ''
        }
        const [showState, setState] = React.useState(State);
        const dispatchAsynce = useAppDispatch();
        const dispatch = useDispatch();


        const openClosePopup = () => {
            if(!showState.errorMessage)
            {
                setState((prevState) => ({
                    ...prevState,
                    isModalOpen: !prevState.isModalOpen
                }));
            }

        }
        const oneOrMoreParameterAreNull = (): boolean => {
            if (showState.nameOfTask === '') {
                setState((prevState) => ({
                    ...prevState,
                    errorMessage: 'Task name is required'
                }))
                return true
            }
            if (showState.description === '') {
                setState((prevState) => ({
                    ...prevState,
                    errorMessage: 'Description is required'
                }))
                return true
            }
            if (showState.idOfUser === '') {
                setState((prevState) => ({
                    ...prevState,
                    errorMessage: 'User id is required'
                }))
                return true
            }
            return false;
        } //check if all the parameters are not empty
        const userNameHasNumbers = (nameOfUser: string): boolean => {
            for (let i = 0; i < nameOfUser.length; i++) {
                if(parseInt(nameOfUser.charAt(i))===0) {
                    return true
                }
                if (parseInt(nameOfUser.charAt(i))) {
                    return true
                }
            }
            return false;
        } //returns true if nameOfUser has numbers
        const clientInputCheck = ():boolean =>{
            if(isNaN(parseInt(showState.idOfUser,10)))
            {
                setState((prevState) =>({
                    ...prevState,
                    thereIsAnError: true,
                    errorMessage:'ID cannot have letters',
                }))
                console.log('true1')
                return true
            }
            if( oneOrMoreParameterAreNull())
            {
                setState((prevState) =>({
                    ...prevState,
                    thereIsAnError:true,
                    errorMessage: 'Fill all parameters'
                }))
                console.log('true2')
                return true
            }
            if (userNameHasNumbers(showState.nameOfTask)) {
                setState((prevState) =>({
                    ...prevState,
                    thereIsAnError:true,
                    errorMessage: 'Task name cannot have numbers'
                }))
                console.log('true3')
                return true
            }

            return false
        } // Checks the User's input before submitting it

        const checkStateAndSubmit = () => {
            if (oneOrMoreParameterAreNull() && !clientInputCheck()) {
                setState((prevState) => ({
                    ...prevState,
                    thereIsAnError: true
                }))
            }
            else {
                const newTask: Task = {
                    taskName: showState.nameOfTask,
                    idOfUser: parseInt(showState.idOfUser, 10),
                    taskDescription: showState.description
                }
                dispatchAsynce(addTasksToServer(newTask));
                dispatch(addTask(newTask));
                setState((prevState) => ({
                    ...prevState,
                    isModalOpen: false
                }))
            }
        } //submitting


        const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setState((prevState) => ({
                ...prevState,
                idOfUser: e.target.value
            }))
        } //ID handler

        const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setState((prevState) => ({
                ...prevState,
                nameOfTask: e.target.value
            }))

        } //Name handler
        const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setState((prevState) => ({
                ...prevState,
                description: e.target.value
            }))
        }//Description handler
        return (
            <React.Fragment>

                <button className="button" onClick={openClosePopup}><span>Add new Task</span></button>


                <Modal show={showState.isModalOpen} onHide={openClosePopup}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <form>
                            <img src={userIcon} alt="Logo" height='40px' width='40px' className={'img'}/>
                            <div className='div-spaces'></div>
                            <div className='div-spaces'></div>
                            <div className='div'></div>
                            <div className='div-spaces'></div>
                            <h1 className={'text-of-titles'}>Task name:</h1>
                            <div className='div-spaces'></div>
                            <input type='text' className={'input-group-text style-adding-to-text'}
                                   id='input_of_Task_name' value={showState.nameOfTask} onChange={handleNameChange}
                                   autoComplete='name'></input>
                            <div className='div-spaces'></div>
                            <h1 className={'text-of-titles'}>Id of User:</h1>
                            <div className='div-spaces'></div>
                            <input type='number' className='input-group-text style-adding-to-text'
                                   value={showState.idOfUser} onChange={handleIdChange}></input>
                            <div className='div-spaces'></div>
                            <h1 className={'text-of-titles'}>Description:</h1>
                            <div className='div-spaces'></div>
                            <input type='text' className={'input-group-text style-adding-to-text'}
                                   value={showState.description} onChange={handleDescriptionChange}></input>
                            <div className='div-spaces'></div>
                            <div className={'div-of-Error'}
                                 style={{visibility: showState.thereIsAnError ? 'visible' : 'hidden'}}>{showState.errorMessage}
                            </div>
                        </form>
                    </Modal.Body>
                    <Button onClick={checkStateAndSubmit}>
                        Submit
                    </Button>
                </Modal>
            </React.Fragment>
        );



    }
}