"use client"
import React from "react";
import { createContext } from "vm"

export const MyNamecontext = createContext();
type ChilderType = {
    children: React.ReactNode
}

export default function MyName ({children}: ChilderType) {
    const name:string = "Muzamil Baig"; 
    console.log(name)
    return(
        <>
            <MyNamecontext.Provider value={name}>
                {children}
            </MyNamecontext.Provider>
        </>
    )
}