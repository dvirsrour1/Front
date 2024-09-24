import React, {useEffect, Component} from 'react';
import axios from "axios";
import './css_files/Table.css'
interface User{
    name: string;
    id: string;
    description: string;
}

interface ArrayOfUsers{
    UsersArray: Array<User>;
    showTable: number;
}
class TableComponent extends Component<{} ,ArrayOfUsers> {

    constructor(props: {}) {
        super(props);
        this.state = {
            showTable: 1
            ,UsersArray: []
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
    }


    render() {
        {/*need to find a func that will render it once*/}
        return (
            <React.Fragment>
            <div className='scrollit'>
                <table className="table table_style">
                    <thead>
                    <tr className='tr'>
                        <th className="col">#</th>
                        <th className="col">UserName</th>
                        <th className="col">Id</th>
                        <th className="col">Description</th>
                    </tr>
                    </thead>
                    {this.state.UsersArray.map((User,index) => (
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