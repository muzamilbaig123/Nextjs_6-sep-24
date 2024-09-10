"use client"
import { useEffect, useState } from "react"

export default function Counter () {
    const [plusCount, setPlusCount] = useState(0);

    const countStart = () => {
        setPlusCount(plusCount + 1)
    } 

    const countMinus = () => {
        setPlusCount(plusCount - 1)
    }
    
    const randomColor = () => {
        let letter = "123456789ABCDEF";
        let color = "#";

        for(let i = 0; i < 6; i++){
            color += letter[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    useEffect(() => {
        const ranColor = randomColor();
        document.body.style.color = ranColor;

    }, [plusCount])

    return (
        <>
            <div style={{margin: "40px auto", textAlign: "center"}}>
                <h1 className="font-bold, text-7xl">{plusCount}</h1>
                <button style={{border: "2px solid black", padding: "6px 20px"}} onClick={countStart}>Add</button>
                <br />  
                <button style={{border: "2px solid black", padding: "6px 20px",}} className="mt-3" onClick={countMinus}>Minuse</button>  
            </div>
        </>
    )
}