import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import './css_files/userPopUp.css'
import userIcon from './user.png'
interface State{
     isModalOpen: boolean;
     newUserId: string;
     newUserName: string;
     newUserDescription: string;
}
class UserPopUp extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isModalOpen: false,
            newUserId: "",
            newUserName: "",
            newUserDescription: ""
        }
    }
     ChangeState = () => {
        if (this.state.isModalOpen) {
            this.setState({
                isModalOpen: false
            })
        }
        else{
            this.setState({
                isModalOpen: true
            })
        }
    }

    PrintAndChangeState = () => {
        this.setState({
            isModalOpen: true
        })
        alert(`Add new User ${this.state.newUserId}, ${this.state.newUserName}, ${this.state.newUserDescription}`);
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
                <input type='text' className={'input-group-text style-adding-to-text'} id='input_of_user_name' value={this.state.newUserName} onChange={this.handleNameChange}></input>
                <div className='div-spaces'></div>
                <h1 className={'text-of-titles'}>Id:</h1>
                <div className='div-spaces'></div>
                    <input
                        type='text'
                        className='input-group-text style-adding-to-text'
                        id='input_of_user_id'
                        value={this.state.newUserId}
                        onChange={this.handleIdChange}
                    />
                    <div className='div-spaces'></div>
                    <h1 className={'text-of-titles'}>Description:</h1>
                    <div className='div-spaces'></div>
                    <input type='text' className={'input-group-text style-adding-to-text'} value={this.state.newUserDescription} onChange={this.handleDescriptionChange}></input>
                <div className='div-spaces'></div>
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

export default UserPopUp;