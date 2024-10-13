import React, {ChangeEvent, Component} from 'react';
import Modal from "react-bootstrap/Modal";
import userIcon from "./user.png";
import {Button} from "react-bootstrap";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {getStatus, useAppDispatch} from "./Redux/Store";
import {deleteUser, deleteUserFromServer} from "./Redux/Reducer";

interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    UsersId: string;
}
interface UserId{
    id: string;
}
export const DeleteUserPopup = () =>{
    const dispatch = useAppDispatch();
    const state: State = {
        isModalOpen: false,
        thereIsAnError: false,
        UsersId: '',
    };
    const [showState, setState] = React.useState(state)
    const Status = getStatus();
    const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        setState((prevState) =>({
            ...prevState,
            UsersId: event.target.value

        }))
    }


    const ChangeState = () =>{
        setState((prevState) =>({
            ...prevState,
            isModalOpen: !showState.isModalOpen
        }))
    }

    const somethingIsNull = ():boolean =>{
        if(showState.UsersId=== '')
        {
            return true
        }
        return false
    }
    const PrintAndChangeState = () => {
        if (isNaN(parseInt(showState.UsersId,10)) || somethingIsNull()) {
            setState((prevState) =>({
                ...prevState,
                thereIsAnError: true

            }))
        }

        else {
            const userId: UserId ={
                id: showState.UsersId
            }
            console.log(userId.id)
            dispatch(deleteUserFromServer(userId)).then(
                () =>{
                    alert('User deleted successfully.')
                    dispatch(deleteUser(userId.id))
                }).catch(()=>{
                alert('User deleting has failed.')
            })
            if(Status !=='rejected')
            {
                dispatch(deleteUser(state.UsersId))
            }
            setState((prevState) =>({
                ...prevState,
                isModalOpen: false

            }))
        }
        {/*fix the Error functionality.*/}
    }

    return (
        <React.Fragment>
            <button className="button" onClick={ChangeState}><span>Delete a User</span></button>


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
                        <input type='text' className='input-group-text style-adding-to-text' value={showState.UsersId} onChange={handleIdChange} ></input>
                        <div className='div-spaces'></div>
                        <div className={'div-of-Error'} style={{ visibility: showState.thereIsAnError ? 'visible' : 'hidden' }}>ID is incorrect</div>
                    </form>
                </Modal.Body>
                <Button onClick={PrintAndChangeState}>
                    Submit
                </Button>
            </Modal>
        </React.Fragment>
    );

}
