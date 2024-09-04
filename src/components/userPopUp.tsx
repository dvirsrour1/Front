import React, {Component, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from "react-bootstrap";

interface Props {
    isModalOpen: boolean;
}
interface State{
     isModalOpen: boolean;
}
class UserPopUp extends Component<{}, State> {
    constructor(props: {}) {
        super(props);

        this.state = {
            isModalOpen: false

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

    render() {
        return (
            <React.Fragment>
                <button className="button" onClick={this.ChangeState}><span>Add new User</span></button>


        <Modal show={this.state.isModalOpen} onHide={this.ChangeState}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <Modal.Title>Hi</Modal.Title>
            </Modal.Body>
            <Button onClick={this.ChangeState}>
                Close
            </Button>
        </Modal>
            </React.Fragment>
    );


    }
}

export default UserPopUp;