"use client"
import Navbar from "@/components/navbar";
import { cardCxt } from "@/context/card";
import { useContext } from "react";


export default function Home () {
  const cardData = useContext(cardCxt)


  return (
    <>
    <Navbar />
      <div className="box" style={{border: "2px solid black", width: "30%"}}>
        <h2>{cardData?.heading}</h2>
        <p>{cardData?.para}</p>
      </div>
    </>
  )
}