"use client"

import React, { createContext } from "react"

export const cardCxt = createContext<cardBoxType | undefined>(undefined);

type cardTypeChildern = {
    children: React.ReactNode;
}
type cardBoxType = {
    heading: string,
    para: string,
}


export default function Card ({children}: cardTypeChildern) {

    const cardBox:cardBoxType = {
        heading: "I Am A Box",
        para: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem voluptate minus facere! Exercitationem dolorem ut repellat aut, voluptatum unde commodi ducimus, sunt cumque natus optio veniam possimus illum, laboriosam provident."
    }

    return (
        <>
              <cardCxt.Provider value={cardBox}>
                {children}
              </cardCxt.Provider>  
        </>
    )
}