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


class DeleteUserPopup extends Component<{},State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isModalOpen: false,
            thereIsAnError: false,
            UsersId: '',
        }
    }

    handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            UsersId: event.target.value
        })

    }


    ChangeState = () =>{
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    somethingIsNull = ():boolean =>{
        if(this.state.UsersId=== '')
        {
            return true
        }
        return false
    }
    PrintAndChangeState = () => {
        if (isNaN(parseInt(this.state.UsersId,10)) || this.somethingIsNull()) {
            this.setState({
                thereIsAnError: true
            })
        }

        else {

            axios.delete(`http://localhost:9090/DeleteUser/${this.state.UsersId}`).then(response => {
                alert(response.data)
            }).catch(error => {
                alert(error.message)
            })
            this.setState({
                isModalOpen: false
            })
        }
        {/*fix the Error functionality.*/}
    }
    render() {
        return (
            <React.Fragment>
                <button className="button" onClick={this.ChangeState}><span>Delete a User</span></button>


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
                            <h1 className={'text-of-titles'}>User's Id:</h1>
                            <div className='div-spaces'></div>
                            <input type='number' className='input-group-text style-adding-to-text' value={this.state.UsersId} onChange={this.handleIdChange} ></input>
                            <div className='div-spaces'></div>
                            <div className={'div-of-Error'} style={{ visibility: this.state.thereIsAnError ? 'visible' : 'hidden' }}>ID is incorrect</div>
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

export default DeleteUserPopup;