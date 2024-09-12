"use client"
import { MyNamecontext } from "@/context/myname"
import Link from "next/link"
import { useContext } from "react"

export default function Navbar () {
    const myName = useContext(MyNamecontext);
    return (
        <>
        <ul style={{backgroundColor: "#000", color: "#fff", display: "flex", justifyContent: "center", gap: "40px", padding: "12px"}}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/counter">Counter</Link></li>
        </ul>
        <h1 style={{textAlign: "center", marginTop: "20px", fontWeight: "bold", fontSize: "20px"}}>{myName}</h1>
        </>
    )
}