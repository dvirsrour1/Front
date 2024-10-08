import React, {ChangeEvent, Component} from 'react';
import Modal from "react-bootstrap/Modal";
import userIcon from "./user.png";
import {Button} from "react-bootstrap";
import axios from "axios";

interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    UsersId: string;
}

export const DeleteUserPopup = () =>{
    const state: State = {
        isModalOpen: false,
        thereIsAnError: false,
        UsersId: '',
    };
    const [showState, setState] = React.useState(state)

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
            axios.delete(`http://localhost:9090/DeleteUser/${showState.UsersId}`).then(response => {
                alert(response.data)
            }).catch(error => {
                alert(error.message)
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
                        <input type='number' className='input-group-text style-adding-to-text' value={showState.UsersId} onChange={handleIdChange} ></input>
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
