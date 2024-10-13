import React, {useEffect} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";
import './css_files/Popup.css'
import userIcon from './user.png'
import {addUser, addUserToServer} from "./Redux/Reducer";
import {getStatus, getUsersFromStore, useAppDispatch} from "./Redux/Store";

interface State{
    thereIsAnError: boolean;
     isModalOpen: boolean;
     newUserId: string;
     newUserName: string;
     newUserDescription: string;
     errorMessage: string;
}
interface User{
    name: string;
    id: string;
    description: string;
}

export const UserAddingPopup = () =>{
    const dispatch = useAppDispatch();
    const reduxStatus = getStatus();
    const state: State ={
        thereIsAnError: false,
        isModalOpen: false,
        newUserId: "",
        newUserName: "",
        newUserDescription: "",
        errorMessage:""
    }
    const [showState, setState] = React.useState(state);


    const ChangeState = () =>{
        setState((prevState) =>({
            ...prevState,
            isModalOpen: !prevState.isModalOpen

        }));
    }
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
    }
    const somethingIsNull = (): boolean => {
        if (showState.newUserName === '') {
            setState((prevState) => ({
                ...prevState,
                errorMessage: 'User name is required'
            }))
            return true
        }
        if (showState.newUserDescription === '') {
            setState((prevState) => ({
                ...prevState,
                errorMessage: 'Description is required'
            }))
            return true
        }
        if (showState.newUserId === '') {
            setState((prevState) => ({
                ...prevState,
                errorMessage: 'User id is required'
            }))
            return true
        }
        return false;
    }


   const PrintAndChangeState = () => {
        if(isNaN(parseInt(showState.newUserId,10)))
        {
            setState((prevState) =>({
                ...prevState,
                thereIsAnError: true,
                errorMessage:'ID cannot have letters',
            }))

        }
        if ( somethingIsNull() || userNameHasNumbers(showState.newUserName)) {
            setState((prevState) =>({
                ...prevState,
                thereIsAnError:true
            }))
        }

        else {
            const newUser: User = {
                name: showState.newUserName,
                id: showState.newUserId,
                description: showState.newUserDescription
            }
            dispatch(addUserToServer(newUser));
            if(reduxStatus !== 'rejected')
            {
                alert("User added successfully");
                console.log(getUsersFromStore());
                dispatch(addUser(newUser))
                setState((prevState) =>({
                    ...prevState,
                    isModalOpen: false
                }))


            }
        }
    }
    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            newUserId: e.target.value
        }))
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            newUserName: e.target.value
        }))

    }

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            newUserDescription: e.target.value
        }))
    }

    useEffect(() =>{
            console.log('update')
            if(userNameHasNumbers(showState.newUserName))
            {
                setState((prevState) =>({
                    ...prevState,
                    thereIsAnError:true,
                    errorMessage:'avoid numbers in the Name filed.'
                }))

            }
            if(!showState.thereIsAnError && parseInt(showState.newUserName,10))
            {
                setState((prevState) =>({
                    ...prevState,
                    thereIsAnError:true,
                    errorMessage:'avoid numbers in the Name filed.'
                }))
            }
            if(showState.thereIsAnError && !userNameHasNumbers(showState.newUserName))
            {
                setState((prevState) => ({
                    ...prevState,
                    thereIsAnError:false
                }))

            }


    },[showState.newUserName,showState.newUserDescription,showState.newUserId])


    return (
        <React.Fragment>
            <button className="button" onClick={ChangeState}><span>Add new User</span></button>


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
                        <h1 className={'text-of-titles'}>User name:</h1>
                        <div className='div-spaces'></div>
                        <input type='text' className={'input-group-text style-adding-to-text'} id='input_of_user_name' value={showState.newUserName} onChange={handleNameChange} autoComplete='name' ></input>
                        <div className='div-spaces'></div>
                        <h1 className={'text-of-titles'}>Id:</h1>
                        <div className='div-spaces'></div>
                        <input type='number' className='input-group-text style-adding-to-text' value={showState.newUserId} onChange={handleIdChange} ></input>
                        <div className='div-spaces'></div>
                        <h1 className={'text-of-titles'}>Description:</h1>
                        <div className='div-spaces'></div>
                        <input type='text' className={'input-group-text style-adding-to-text'} value={showState.newUserDescription} onChange={handleDescriptionChange}></input>
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

