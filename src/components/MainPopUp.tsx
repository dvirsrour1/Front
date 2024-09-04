import React, {Component} from 'react';

class MainPopUp extends Component {
    render() {
        return (
            <React.Fragment>
                <div id = 'PopUp'>
                    <h1>Adding a User</h1>
                    <form>
                        <label>Username</label>
                        <input type='text' placeholder='Username' id='username' required={true}/>
                        <label>Id</label>
                        <input type='number' placeholder='Id' id='id' required={true}/>
                        <label>description</label>
                        <input type='text' placeholder='Description' id='description' required={true}/>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }


}

export default MainPopUp;