import React, {Component, useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import './css_files/Popup.css'
import userIcon from './user.png'
import axios from "axios";
import {createDispatchHook, Provider} from "react-redux";
import {addUser, showlist} from "./Redux/Reducer";
import {useDispatch} from "react-redux";
import store from "./Redux/Store";

interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    idOfUser: string;
    nameOfTask: string;
    description: string;
    errorMessage: string;
}
interface Task{
    nameOfTask: string;
    idOfUser: number;
    description: string;
}
interface User{
    name: string;
    id: string;
    description: string;
}
interface State{
    thereIsAnError: boolean,
    isModalOpen: boolean,
    nameOfTask: string,
    description: string,
    idOfUser: string,
    errorMessage:string
}
export const TaskAddindPopup  =() => {
    {
        const State: State = {
            thereIsAnError: false,
            isModalOpen: false,
            nameOfTask: '',
            description: '',
            idOfUser: '',
            errorMessage: ''
        }
        const [showState, setState] = React.useState(State);
        const ChangeState = () => {
            setState((prevState) => ({
                ...prevState,
                isModalOpen: !prevState.isModalOpen
            }));
        }
        const dispatch = useDispatch();

        const userNameHasNumbers = (nameOfUser: string): boolean => {
            for (let i = 0; i < nameOfUser.length; i++) {
                if (parseInt(nameOfUser.charAt(i))) {
                    return true
                }
            }
            return false;
        }

        const somethingIsNull = (): boolean => {
            if (showState.nameOfTask === '') {
                setState((prevState) => ({
                    ...prevState,
                    errorMessage: 'User name is required'
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
        }
        const PrintAndChangeState = () => {
            if (somethingIsNull()) {
                setState((prevState) => ({
                    ...prevState,
                    thereIsAnError: true
                }))
            } else {

                const newTask: Task = {
                    nameOfTask: showState.nameOfTask,
                    idOfUser: parseInt(showState.idOfUser, 10),
                    description: showState.description
                }

               // const newUser: User = {
              //      name:'rooi',
              //      id:'5555555',
              //      description:showState.description,
              //  }
              //  dispatch(showlist());
                axios.post('http://localhost:9090/AddTask', newTask).then(response => {
                    alert('Task added successfully')
                }).catch(error => {

                    console.log("error.message")

                })

                setState((prevState) => ({
                    ...prevState,
                    isModalOpen: false
                }))

            }
        }


        const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setState((prevState) => ({
                ...prevState,
                idOfUser: e.target.value
            }))
        }

        const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setState((prevState) => ({
                ...prevState,
                nameOfTask: e.target.value
            }))

        }

        const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setState((prevState) => ({
                ...prevState,
                description: e.target.value
            }))
        }
        return (
            <React.Fragment>

                <button className="button" onClick={ChangeState}><span>Add new Task</span></button>


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
                                 style={{visibility: showState.thereIsAnError ? 'visible' : 'hidden'}}>There was a
                                problem, please try again.
                            </div>
                        </form>
                    </Modal.Body>
                    <Button onClick={PrintAndChangeState}>
                        Submit
                    </Button>
                </Modal>
            </React.Fragment>
        );
        {/*לעשות BIND לכל הפונקציות וSHOWSTATE לכל הפרמטרים של STATE, לבדוק שהכל רץ תקין ואם כן להכניס של הDISPATCH של הSLICE ולבדוק שהוא עובד*/
        }


    }
}