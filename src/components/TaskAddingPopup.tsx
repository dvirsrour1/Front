import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import './css_files/Popup.css'
import userIcon from './user.png'
import axios from "axios";

interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    idOfUser: string;
    nameOfTask: string;
    description: string;
}
interface Task{
    nameOfTask: string;
    idOfUser: number;
    description: string;
}
class TaskAddingPopup extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            thereIsAnError: false,
            isModalOpen: false,
            nameOfTask: '',
            description: '',
            idOfUser: ''
        }


    }
    ChangeState = () =>{
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }


    userNameHasNumbers = (nameOfUser: string): boolean => {
        for (let i = 0; i < nameOfUser.length; i++) {
            if(parseInt(nameOfUser.charAt(i)))
            {
                return true
            }
        }
        return false;
    }
    somethingIsNull = ():boolean =>{
        if(this.state.description=== '' || this.state.nameOfTask === '' || this.state.idOfUser ==='')
        {
            return true
        }
        else
        {
            return false
        }
    }
    PrintAndChangeState = () => {
        if ( this.somethingIsNull() ) {
            this.setState({
                thereIsAnError: true
            })
        }

        else {
            this.setState({
                isModalOpen: true
            })
            const newTask: Task = {
                nameOfTask: this.state.nameOfTask,
                idOfUser: parseInt(this.state.idOfUser,10),
                description: this.state.description
            }
            axios.post('http://localhost:9090/AddTask', newTask).then(response => {
                alert('Task added successfully')
            }).catch(error => {

                    console.log("error.message")

            })
        }
        {/*fix axion*/}
        {/*fix the Error functionality.*/}
    }

    handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({
            idOfUser: e.target.value
        })
    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            nameOfTask: e.target.value
        })
    }

    handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: e.target.value
        })
    }
    render() {
        return (
            <React.Fragment>
                <button className="button" onClick={this.ChangeState}><span>Add new Task</span></button>


                <Modal show={this.state.isModalOpen} onHide={this.ChangeState}>
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
                            <input type='text' className={'input-group-text style-adding-to-text'} id='input_of_Task_name' value={this.state.nameOfTask} onChange={this.handleNameChange} autoComplete='name' ></input>
                            <div className='div-spaces'></div>
                            <h1 className={'text-of-titles'}>Id of User:</h1>
                            <div className='div-spaces'></div>
                            <input type='password' className='input-group-text style-adding-to-text' value={this.state.idOfUser} onChange={this.handleIdChange} ></input>
                            <div className='div-spaces'></div>
                            <h1 className={'text-of-titles'}>Description:</h1>
                            <div className='div-spaces'></div>
                            <input type='text' className={'input-group-text style-adding-to-text'} value={this.state.description} onChange={this.handleDescriptionChange}></input>
                            <div className='div-spaces'></div>
                            <div className={'div-of-Error'} style={{ visibility: this.state.thereIsAnError ? 'visible' : 'hidden' }}>There was a problem, please try again.</div>
                        </form>
                    </Modal.Body>
                    <Button onClick={this.PrintAndChangeState}>
                        Submit
                    </Button>
                </Modal>
            </React.Fragment>
        );


    }
}

export default TaskAddingPopup;

