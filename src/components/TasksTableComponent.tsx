import React, {useEffect, Component} from 'react';
import axios from "axios";
import './css_files/Table.css'
interface Task{
    taskName: string;
    idOfUser: string;
    taskDescription: string;
}

interface ArrayOfUsers{
    TaskArray: Array<Task>;
    showTable: number;
}
class TasksTableComponent extends Component<{} ,ArrayOfUsers> {

    constructor(props: {}) {
        super(props);
        this.state = {
            showTable: 1
            ,TaskArray: []
        }
    }


    componentDidUpdate(prevProps: {}, prevState: Readonly<ArrayOfUsers>, snapshot?: any) {
        if(prevState.showTable !== this.state.showTable) {
            axios.get("http://localhost:9090/Tasks").then((response) => {
                this.setState({
                    TaskArray: response.data
                })
                console.log(this.state.TaskArray);
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
                <div className='div-spaces'/>
                <input className='input-group-text input-search'/>
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
                        {this.state.TaskArray.map((Task, index) => (
                            <thead className="thead-dark">
                            <tr key={index}>
                                <th>{index}</th>
                                <td>{Task.taskName}</td>
                                <td>{Task.idOfUser}</td>
                                <td>{Task.taskDescription}</td>
                            </tr>
                            </thead>
                        ))}
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default TasksTableComponent;