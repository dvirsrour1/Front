import React, {Component, useState} from 'react';
import axios from "axios";



export const AllUserComponent =() =>{
    const [show, setShow] = useState(false);

    function ButtonShow() {
        setShow(true);
        axios.get("http://localhost:9090/List").then((response) => {
            console.log(response.data);
            const Array = response.data;

        }).catch((error) => {
            console.log(error);
        })
    }
    {/*להכניס את מידע הGET לתוך טבלה*/}
        return (
            <React.Fragment>
                <button
                    className="button"
                    onClick={ButtonShow}
                >
                    Show All Users
                </button>
            </React.Fragment>
        );
}

export default AllUserComponent;