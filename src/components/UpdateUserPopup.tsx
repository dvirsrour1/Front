import React, {ChangeEvent, Component} from 'react';
import Modal from "react-bootstrap/Modal";
import userIcon from "./user.png";
import {Button} from "react-bootstrap";
import axios from "axios";
import {useDispatch} from "react-redux";
import {showlist} from "./Redux/Reducer";

interface UserUpdating{
    userId:string;
    description: string;
}
interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    UsersId: string;
    description:string;
    errorMessage:string;
}

export const UpdateUserPopup = () =>{
    const dispatch = useDispatch();
    const state: State = {
        isModalOpen: false,
        thereIsAnError: false,
        UsersId: '',
        description: '',
        errorMessage: ''
    };
    const [showState, setState] = React.useState(state)
    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState((prevState) =>({
            ...prevState,
            UsersId: event.target.value
        }))
    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) =>({
            ...prevState,
            description: e.target.value
        }))
    }

    const ChangeState = () =>{
        setState((prevState) =>({
            ...prevState,
            isModalOpen: !prevState.isModalOpen
        }))
    }

    const somethingIsNull = ():boolean =>{
        if(showState.UsersId==='')
        {
            setState((prevState) =>({
                ...prevState,
                errorMessage:'id is required'
            }))
            return true
        }
        if(showState.description==='')
        {
            setState((prevState) =>({
                ...prevState,
                errorMessage:'description is required'
            }))
            return true
        }
        return false;
    }
    const PrintAndChangeState = () => {
        if(isNaN(parseInt(showState.UsersId,10)))
        {
            setState((prevState) =>({
                ...prevState,
                thereIsAnError: true,
                errorMessage:'ID is required'
            }))
        }
        if (somethingIsNull()) {
            setState((prevState) =>({
                ...prevState,
                thereIsAnError: true
            }))
        }

        else {

            const UpdatingUser: UserUpdating = {
                userId: showState.UsersId,
                description: showState.description
            }
            axios.post('http://localhost:9090/UpdateUserDescription', UpdatingUser).then(response => {
                alert('User updated succesefuly')
            }).catch(error => {
                console.log(error.message)
            })
            setState((prevState) =>({
                ...prevState,
                isModalOpen: false
            }))
        }
        {/*fix the Error functionality.*/}
    }

    return (
        <React.Fragment>
            <button className="button" onClick={ChangeState}><span>Updating a User</span></button>


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
                        <h1 className={'text-of-titles'}>User's Id:</h1>
                        <div className='div-spaces'></div>
                        <input type='number' className='input-group-text style-adding-to-text' value={showState.UsersId} onChange={handleIdChange} ></input>
                        <div className='div-spaces'></div>
                        <h1 className={'text-of-titles'}>New description:</h1>
                        <div className='div-spaces'></div>
                        <input type='text' className={'input-group-text style-adding-to-text'} value={showState.description} onChange={handleDescriptionChange}></input>
                        <div className='div-spaces'></div>
                        <div className={'div-of-Error'} style={{ visibility: showState.thereIsAnError ? 'visible' : 'hidden' }}>{showState.errorMessage}</div>
                    </form>
                </Modal.Body>
                <Button onClick={PrintAndChangeState}>
                    Submit
                </Button>
            </Modal>
        </React.Fragment>
    );
}
