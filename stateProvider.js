"use client"
import React,{createContext,useContext,useReducer} from 'react';

export const StateContext=createContext()

export const StateProvider=({reducer,initialState,children})=>{
    const value = useReducer(reducer,initialState);
    return (
    <StateContext.Provider value={value}>
        {children}
    </StateContext.Provider>
    )
}
export const useStateValue=()=>useContext(StateContext);
