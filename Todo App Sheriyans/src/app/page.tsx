"use client"

import { FormEvent, useState } from "react"

type titleDesc = {
  title: string
  desc: string
}

export default function App () {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState<titleDesc[]>([])
  const [editIndex, setEditIndex] = useState<number | null>(null); //chatgpt

  const TodoFormHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // chatgpt
    if (editIndex !== null) {
      // Edit task
      const updatedTasks = mainTask.map((task, i) => 
        i === editIndex ? { title, desc } : task
      );
      setMainTask(updatedTasks);
      setEditIndex(null);
    } else {
      // Add new task
      setMainTask([...mainTask, { title, desc }]);
    }

    setTitle("");
    setDesc("");
    
  } 

  const deleteTask = (ind:number) => {
    setMainTask(mainTask.filter((_, i) => (i !== ind)))
  }
  const editTask = (ind:number) => {
    setEditIndex(ind);
    setTitle(mainTask[ind].title);
    setDesc(mainTask[ind].desc);
  }



  let taskNotAvail = <h2 style={{textAlign: "center"}}>Task not Available</h2>
  
  const renderTaskMap = mainTask.map((ele, i) => {
      return (
        <div key={i} className="innertask" style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
            <h3>{ele.title}</h3>
            <h3>{ele.desc}</h3>
            <button onClick={() => {editTask(i)}}>edit </button>
            <button onClick={() => {deleteTask(i)}}>delete </button>
        </div>
      )
    })



  return (
    <>
    <h1 style={{textAlign: "center"}}>My Todo List In React</h1>
      <form onSubmit={TodoFormHandler} style={{display: "flex", justifyContent: "space-around", alignItems: "center"} }>

        <label>Title <input type="text" 
        placeholder="Enter title"
        value={title}
        onChange={((e) => {setTitle(e.target.value)})}
        /></label>
        
        <label>Description <input type="text" 
        placeholder="Enter Description"
        value={desc}
        onChange={((e) => {setDesc(e.target.value)})}
        /></label>
        <button type="submit">{editIndex !== null ? "Save" : "Add"}</button>
      </form>

      <div className="container" style={{backgroundColor: "lightgray", padding: "16px", margin: "20px"}}>
        {mainTask.length === 0 ? taskNotAvail: renderTaskMap}
      </div>

    </>
  )
}