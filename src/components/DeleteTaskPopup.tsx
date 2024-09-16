import React, {ChangeEvent, Component} from 'react';
import Modal from "react-bootstrap/Modal";
import userIcon from "./user.png";
import {Button} from "react-bootstrap";
import axios from "axios";

interface State{
    thereIsAnError: boolean;
    isModalOpen: boolean;
    nameOfTaskState: string;
}

interface nameOfTaskObject{
    nameOfTask: string;
}

class DeleteTaskPopup extends Component<{},State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isModalOpen: false,
            thereIsAnError: false,
            nameOfTaskState: '',
        }
    }

    handleNameOfTaskChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            nameOfTaskState: event.target.value
        })
    }


    ChangeState = () =>{
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    somethingIsNull = ():boolean =>{
        if(this.state.nameOfTaskState=== '')
        {
            return true
        }
        return false
    }
    PrintAndChangeState = () => {
        if (this.somethingIsNull()) {
            this.setState({
                thereIsAnError: true
            })
        }

        else {
            this.setState({
                isModalOpen: true
            })
            const nameOfTaskObject: nameOfTaskObject = {
                nameOfTask: this.state.nameOfTaskState
            }
            axios.delete(`http://localhost:9090/DeleteTask`, {data: nameOfTaskObject}).then(response => {
                alert('Task Deleted successfully')
            }).catch(error => {
                console.log(error.message)
            })
        }
        {/*fix the Error functionality.*/}
    }
    render() {
        return (
            <React.Fragment>
                <button className="button" onClick={this.ChangeState}><span>Delete a Task</span></button>


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
                            <h1 className={'text-of-titles'}>Name of Task:</h1>
                            <div className='div-spaces'></div>
                            <input type='text' className='input-group-text style-adding-to-text' value={this.state.nameOfTaskState} onChange={this.handleNameOfTaskChange} ></input>
                            <div className='div-spaces'></div>
                            <div className={'div-of-Error'}
                                 style={{visibility: this.state.thereIsAnError ? 'visible' : 'hidden'}}>There was a
                                problem, please try again.
                            </div>
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

export default DeleteTaskPopup;