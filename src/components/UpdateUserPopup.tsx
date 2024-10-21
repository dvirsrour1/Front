import React, {ChangeEvent} from 'react';
import Modal from "react-bootstrap/Modal";
import userIcon from "./user.png";
import {Button} from "react-bootstrap";
import reducer, {
    changeUserDes,
    updateUserDescriptionServer
} from "./Redux/Reducer";
import {getStatus, useAppDispatch} from "./Redux/Store";

interface UserUpdating{
    userId:string;
    description: string;
} // UserUpdating interface
interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    UsersId: string;
    description:string;
    errorMessage:string;
} // State interface

export const UpdateUserPopup = () =>{
    //const's
    const reduxStatus = getStatus();
    const dispatch = useAppDispatch();
    const state: State = {
        isModalOpen: false,
        thereIsAnError: false,
        UsersId: '',
        description: '',
        errorMessage: ''
    };
    const [showState, setState] = React.useState(state)


    const openClosePopup = () =>{
        setState((prevState) =>({
            ...prevState,
            isModalOpen: !prevState.isModalOpen
        }))
    }
    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState((prevState) =>({
            ...prevState,
            UsersId: event.target.value
        }))
    } // ID handler
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) =>({
            ...prevState,
            description: e.target.value
        }))
    } // Description handler
    const oneOrMoreParameterAreNull = ():boolean =>{
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
    } // returns true if one more parameters are empty
    const clientInputCheck = ():boolean =>{
        if(isNaN(parseInt(showState.UsersId,10)))
        {
            setState((prevState) =>({
                ...prevState,
                thereIsAnError: true,
                errorMessage:'ID is required'
            }))
            return true
        }
        if (oneOrMoreParameterAreNull()) {
            setState((prevState) =>({
                ...prevState,
                thereIsAnError: true
            }))
            return true
        }
        return false
    }// Checks the User input before submitting it
    const checkStateAndSubmit = () => {
        if(!clientInputCheck()){

            const UpdatingUser: UserUpdating = {
                userId: showState.UsersId,
                description: showState.description
            }

            dispatch(updateUserDescriptionServer(UpdatingUser))
            if(reduxStatus !== 'rejected')
            {
                dispatch(changeUserDes(UpdatingUser)); // check if the unique dispatch works
            }
            setState((prevState) =>({
                ...prevState,
                isModalOpen: false
            }))
        }
    } //submitting

    return (
        <React.Fragment>
            <button className="button" onClick={openClosePopup}><span>Updating a User</span></button>


            <Modal show={showState.isModalOpen} onHide={openClosePopup}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <form>
                        <img src={userIcon} alt="Logo" height='40px' width='40px' className={'img'}/>
                        <div className='div-spaces'></div>
                        <div className='div-spaces'></div>
                        <div className='div'></div>
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
                <Button onClick={checkStateAndSubmit}>
                    Submit
                </Button>
            </Modal>
        </React.Fragment>
    );
}
