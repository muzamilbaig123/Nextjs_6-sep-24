"use client"

import { useState } from "react"

export default function App () {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <>
      <h1 className="first-heading">Todo Learning</h1>
      <div className="todo-container">
        {/* title input field */}
        <label htmlFor="tit">Enter Title</label>
       
        <input type="text" placeholder="Enter Title Here"
         value={title}
         onChange={((e) => {setTitle(e.target.value)})}
         id="tit"
         />
        {/* description input field */}
        <label htmlFor="des">Enter description </label>
        <input type="text" placeholder="Enter Descrition Here"
         value={desc}
         onChange={((e) => {setDesc(e.target.value)})}
         id="des"
         />
          
         <button>Add</button>
      </div>

      <div className="display-container">

      </div>

    </>
  )
}