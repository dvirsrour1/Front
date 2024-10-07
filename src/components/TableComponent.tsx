import React, {useEffect, Component, ChangeEvent} from 'react';
import axios from "axios";
import './css_files/Table.css'
import {Provider} from "react-redux";
import store from "./Redux/Store";
interface User{
    name: string;
    id: string;
    description: string;
}

interface ArrayOfUsers{
    UsersArray: Array<User>;
    UsersArrayHelper: Array<User>;
    showTable: number;
    searchBerText: any;
}
class TableComponent extends Component<{} ,ArrayOfUsers> {

    constructor(props: {}) {
        super(props);
        this.state = {
            showTable: 1
            ,UsersArray: [],
            UsersArrayHelper:[],
            searchBerText: ""
        }
    }


    componentDidUpdate(prevProps: {}, prevState: Readonly<ArrayOfUsers>, snapshot?: any) {
        if(prevState.showTable !== this.state.showTable) {
                axios.get("http://localhost:9090/List").then((response) => {
                    this.setState({
                        UsersArray: response.data
                    })
                    console.log(this.state.UsersArray);
                }).catch((error) => {
                    console.log(error);
                })
        }

    }
    componentDidMount() {
        const interval = setInterval(() => {
            this.setState({
                showTable: (this.state.showTable<2000 ? +100: this.state.showTable)
            });
        }, this.state.showTable);
        console.log(this.state.showTable)
        if(this.state.searchBerText === ''){
            axios.get("http://localhost:9090/List").then((response) => {
                this.setState({
                    UsersArray: response.data
                })
                console.log(this.state.UsersArray);
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    inputChange =(e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            searchBerText: e.target.value
        })
    }

    searchButtonClicked = () => {
        this.state.UsersArray.map((User,index)=>{
            if(User.name===this.state.searchBerText)
            {
                this.state.UsersArrayHelper.push(User)
            }
        })

        this.setState({UsersArray: this.state.UsersArrayHelper})
    }


    render() {
        if(this.state.searchBerText === ''){
            axios.get("http://localhost:9090/List").then((response) => {
                this.setState({
                    UsersArray: response.data,
                    UsersArrayHelper:[]
                })
                console.log(this.state.UsersArray);
            }).catch((error) => {
                console.log(error);
            })
        }
        return (
            <React.Fragment>
                <div className='div-spaces' />
                <div className='search'>
                <input className='input-group-text input-search' onChange={this.inputChange}/>
                    <button className={'search-button'} onClick={this.searchButtonClicked}>SEARCH</button>
                </div>
                <div className='div-spaces'></div>
                <div className='scrollit'>
                    <table className="table table_style">
                        <thead>
                        <tr className='tr'>
                            <th className="col">#</th>
                            <th className="col">Name</th>
                            <th className="col">Id</th>
                            <th className="col">Description</th>
                        </tr>
                        </thead>
                        {this.state.UsersArray.map((User, index) => (
                            <thead className="thead-dark">
                            <tr key={index}>
                                <th>{index}</th>
                                <td>{User.name}</td>
                                <td>{User.id}</td>
                                <td>{User.description}</td>
                            </tr>
                            </thead>
                        ))}
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default TableComponent;