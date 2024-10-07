import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import React, {useEffect, useState} from "react";
import axios from "axios";
interface User{
    name: string;
    id: string;
    description: string;
}
interface AppState {
    users: Array<User>,
    status: string,
    error: boolean
}

const initialState: AppState = {
    users: [],
    status: 'idle', //rejected | fulfilled | peding
    error: false
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    try {
        const response = await axios.get('http://localhost:9090/List');
        return response.data;
    } catch (error) {
        return error;
    }
});
const SliceUsers = createSlice({
    name: 'users',
    initialState,
    reducers:{
        updateUsers: (state) => {
        },
        showlist: (state) =>{
            for(let i = 0; i < state.users.length; i++)
            {
                console.log(fetchUsers);
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
        deleteUser: (state, action: PayloadAction<User>) => {
            const index = state.users.indexOf(action.payload)
            state.users.splice(index, 1)
        }

    },
    extraReducers(builder){ // הוספת הגדרות לפעולות א-סינכרוניות
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.status = 'pending'
        }).addCase(fetchUsers.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.users = action.payload
            console.log(state.users)
        }).addCase(fetchUsers.rejected, (state, action) => {
            state.status = 'rejected'
        })
    }
})

export const getAllUsers = () =>{return initialState.users}
export const getStateStatus = () =>{return initialState.status}
export const getStateError = () =>{ return initialState.error}
export const {addUser, deleteUser, showlist, updateUsers} = SliceUsers.actions;
export default SliceUsers.reducer;