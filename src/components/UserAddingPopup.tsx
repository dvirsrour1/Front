import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import './css_files/Popup.css'
import userIcon from './user.png'
import axios from "axios";

interface State{
    thereIsAnError: boolean;
     isModalOpen: boolean;
     newUserId: string;
     newUserName: string;
     newUserDescription: string;
}
interface User{
    name: string;
    id: string;
    description: string;
}
class UserAddingPopup extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            thereIsAnError: false,
            isModalOpen: false,
            newUserId: "",
            newUserName: "",
            newUserDescription: ""
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
        if(this.state.newUserName=== '' || this.state.newUserId === '' || this.state.newUserDescription ==='')
        {
            return true
        }
        else
        {
            return false
        }
    }
    PrintAndChangeState = () => {
        if (isNaN(parseInt(this.state.newUserId,10)) || this.somethingIsNull() || this.userNameHasNumbers(this.state.newUserName)) {
            this.setState({
                thereIsAnError: true
            })

        }

        else {
            this.setState({
                isModalOpen: true
            })
            const newUser: User = {
                name: this.state.newUserName,
                id: this.state.newUserId,
                description: this.state.newUserDescription
            }
            axios.post('http://localhost:9090/NewUser', newUser).then(response => {
                alert("User added successfully");
            }).catch(error => {
                    console.log(error.message)
            })
        }
        {/*fix the Error functionality.*/}
    }

    handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({
            newUserId: e.target.value
        })
    }

    handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newUserName: e.target.value
        })
    }

    handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newUserDescription: e.target.value
        })
    }
    render() {
        return (
            <React.Fragment>
                <button className="button" onClick={this.ChangeState}><span>Add new User</span></button>


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
                <h1 className={'text-of-titles'}>User name:</h1>
                <div className='div-spaces'></div>
                <input type='text' className={'input-group-text style-adding-to-text'} id='input_of_user_name' value={this.state.newUserName} onChange={this.handleNameChange} autoComplete='name' ></input>
                <div className='div-spaces'></div>
                <h1 className={'text-of-titles'}>Id:</h1>
                <div className='div-spaces'></div>
                    <input type='password' className='input-group-text style-adding-to-text' value={this.state.newUserId} onChange={this.handleIdChange} ></input>
                    <div className='div-spaces'></div>
                    <h1 className={'text-of-titles'}>Description:</h1>
                    <div className='div-spaces'></div>
                    <input type='text' className={'input-group-text style-adding-to-text'} value={this.state.newUserDescription} onChange={this.handleDescriptionChange}></input>
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

export default UserAddingPopup;