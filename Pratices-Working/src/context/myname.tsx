"use client"
import React from "react";
import { createContext } from "react"

export const MyNamecontext = createContext("");
type ChilderType = {
    children: React.ReactNode
}

export default function MyName ({children}: ChilderType) {
    const name:string = "Muzamil Baig"; 
    return(
        <>
            <MyNamecontext.Provider value={name}>
                {children}
            </MyNamecontext.Provider>
        </>
    )
}