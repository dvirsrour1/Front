import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import React, {useEffect, useState} from "react";
import axios from "axios";
import {AppDispatch, useAppDispatch} from "./Store";
import {useDispatch} from "react-redux";
interface User{
    name: string;
    id: string;
    description: string;
}
interface Task{
    taskName: string;
    idOfUser: number;
    taskDescription: string;
}
interface UserId{
    id: string;
}
interface nameOfTaskObject{
    nameOfTask: string;
}
interface AppState {
    users: Array<User>,
    tasks: Array<Task>,
    status: string,
    error: boolean
}

const initialState: AppState = {
    users: [],
    tasks: [],
    status: 'idle', //rejected | fulfilled | peding
    error: false
}

interface UserUpdating{
    userId:string;
    description: string;
}
export const deleteUserFromServer =
    createAsyncThunk('users/deleteUser', async (Userid: UserId) =>{
        try {
            console.log('http://localhost:9090/DeleteUser/' + Userid.id)
            const response = await axios.delete(`http://localhost:9090/DeleteUser/${Userid.id}`);
            return response.data;
        }catch (error){
            return error
        }
    });
export const getUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get('http://localhost:9090/List');
        return response.data;
    } catch (error) {
        return error;
    }
});

export const addTasksToServer = createAsyncThunk('users/addTask', async (newTask : Task) =>{
    try {
        const response = await axios.post('http://localhost:9090/AddTask',newTask);
        return response.data;
    }catch (error) {
        return error;
    }
})

export const getTasks = createAsyncThunk('users/fetchTasks', async () => {
    try {
        const response = await axios.get('http://localhost:9090/Tasks');
        return response.data;
    }catch (error) {
        return error;
    }
})

//const dispatch = useAppDispatch();
//useEffect(()=>{
//    if(initialState.status === 'fulfilled'){
//        dispatch(getUsers());
//    }
//},[initialState.status]);
//
export const addUserToServer =
    createAsyncThunk('users/addUser', async (user: User) =>{
        try {
            const response = await axios.post('http://localhost:9090/NewUser', user);
            return response.data;
        }catch (error) {
            return error;
        }
    })

export const updateUserDescriptionServer =
    createAsyncThunk('users/updateUserDescription', async (userUpdate: UserUpdating) =>{
        try{
            const response = await axios.post('http://localhost:9090/UpdateUserDescription', userUpdate);
            return response.data;
        }catch (error) {
            return error;
        }
    })

export const deleteTasksFromServer = createAsyncThunk(
    'users/deleteTasksFromServer',async (taskSubject: nameOfTaskObject) =>{
        try {
            const response = await axios.delete('http://localhost:9090/DeleteTask', {data: taskSubject.nameOfTask});
            return response.data;
        }
        catch (error) {
            return error;
        }
    }
)
const SliceUsers = createSlice({
    name: 'users', // part of the store
    initialState,
    reducers:{
        updateUsers: (state) => {
        },
        showlist: (state) =>{
            for(let i = 0; i < state.users.length; i++)
            {
                console.log(getUsers);
                console.log(state.users[i].id)
                console.log(state.users[i].name)
                console.log(state.users[i].description)
            }
        },
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload)
            alert(state.users.length);
            showlist();

        },
        deleteUser: (state, action: PayloadAction<string>) => {
            for(let i = 0 ; i < state.users.length; i++)
            {
               if(state.users[i].id == action.payload){
                   state.users.splice(i,1);
               }
            }
            for(let i = 0; i < state.tasks.length; i++){
                if(state.tasks[i].idOfUser == parseInt(action.payload))
                {
                    state.tasks.splice(i,1);
                }
            }
        },
        getUsersToState:(state) =>{
            getUsers();
        },
        addTask:(state, action:PayloadAction<Task>) =>{
            state.tasks.push(action.payload)
            for(var i = 0; i < state.tasks.length; i++)
            {
                console.log(state.tasks[i].idOfUser);
                console.log(state.tasks[i].taskName);
                console.log(state.tasks[i].taskDescription);
            }
        },
        changeUserDes:(state, action:PayloadAction<UserUpdating>) =>{
          let index = 0;
            for(let i = 0; i < state.users.length; i++)
          {
              if(state.users[i].id == action.payload.userId)
              {
                  index  = i
              }
          }
            state.users[index].description = action.payload.description;
            alert('Changed!')
        },deleteTask:(state, action:PayloadAction<nameOfTaskObject>) =>{
            let i = 0;
            for(let i = 0; i < state.tasks.length; i++)
            {
                if(state.tasks[i].taskName === action.payload.nameOfTask)
                {
                    state.tasks.splice(i,1);
                }
            }
            alert('Changed!')
        }


    },
    extraReducers(builder){ // הוספת הגדרות לפעולות א-סינכרוניות
        builder.addCase(getUsers.pending || addUserToServer.pending || updateUserDescriptionServer.pending || getTasks.pending || addTasksToServer.pending || deleteTasksFromServer.pending || deleteUserFromServer.pending, (state, action) => {
            state.status = 'pending'
        }).addCase(getUsers.fulfilled, (state, action) => {
            state.status = 'fulfilled'
          //  getUsers();
            state.users = action.payload
            console.log(state.users)
            console.log(initialState.users)
        }).addCase(getUsers.rejected || addUserToServer.rejected || updateUserDescriptionServer.rejected || getTasks.rejected || addTasksToServer.rejected || deleteUserFromServer.rejected || deleteTasksFromServer.rejected, (state, action) => {
            state.status = 'rejected'
        }).addCase(addUserToServer.fulfilled || deleteTasksFromServer.fulfilled || deleteUserFromServer.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            console.log('finish')

        }).addCase(getTasks.fulfilled, (state, action) => {
            state.status = 'fulfilled';
            state.tasks = action.payload;
            console.log(initialState.tasks)
            console.log('Reducer')
        }).addCase(addTasksToServer.fulfilled, (state, action) => {
            state.status = 'fulfilled';
       //     state.tasks.push(action.payload)
            alert('Task added successfully')
        })
    }

})
export const getStateStatus = () =>{return initialState.status}


export const {addUser, deleteUser, showlist, updateUsers,addTask, changeUserDes,deleteTask} = SliceUsers.actions;
export default SliceUsers.reducer;