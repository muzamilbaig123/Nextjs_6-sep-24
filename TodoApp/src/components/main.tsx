import { useState } from "react";
const { v4: uuidv4 } = require('uuid');

interface TodoItem {
    id: string;
    todo: string;
    isCompleted: boolean;
}

export default function MainSection() {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [editId, setEditId] = useState<string | null>(null); // To track which todo is being edited

    const handleAdd = () => {
        if (!todo.trim()) return;

        if (editId) {
            // If in editing mode, update the todo
            const updatedTodos = todos.map(item =>
                item.id === editId ? { ...item, todo } : item
            );
            setTodos(updatedTodos);
            setEditId(null); // Reset after saving
        } else {
            // If adding new todo
            setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
        }

        setTodo(""); // Clear input box
    };

    const handleEdit = (id: string) => {
        const todoToEdit = todos.find(item => item.id === id);
        if (todoToEdit) {
            setTodo(todoToEdit.todo); // Set the input box value to the selected todo
            setEditId(id); // Set the id to indicate we are editing this todo
        }
    };

    const handleDelete = (id: string) => {
        setTodos(todos.filter((item) => item.id !== id));
    };

    const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.name;
        const newTodos = todos.map((item) =>
            item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
        );
        setTodos(newTodos);
    };

    return (
        <div className="container bg-blue-100 m-auto p-2" style={{ minHeight: "100vh" }}>
            <h1 className="text-black text-4xl p-4 font-bold cursor-cell text-center">Todo Application</h1>

            <div className="form-todo text-center">
                <input
                    type="text"
                    onChange={(e) => setTodo(e.target.value)}
                    value={todo}
                    className="w-1/2 p-2 rounded-md"
                    placeholder="Enter Todo"
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-800 text-white pt-2 pb-2 pl-8 pr-8 ml-8 rounded-md"
                >
                    {editId ? "Save" : "Add"} {/* Toggle between Add and Save */}
                </button>
            </div>

            <h3 className="text-black text-2xl font-bold underline text-center mt-8 mb-8">
                {todos.length === 0 ? "All Todos Not Found" : "Read Your Todos"}
            </h3>

            {todos.map((item) => (
                <div className="todos p-2" key={item.id}>
                    <div className="para-btn flex justify-center items-center mt-8 mb-8">
                        <input
                            type="checkbox"
                            onChange={handleCheckbox}
                            name={item.id}
                            checked={item.isCompleted}
                            className="mr-10"
                        />
                        <p className={item.isCompleted ? "line-through" : "text-1xl"}>
                            {item.todo}
                        </p>
                        <button
                            onClick={() => handleEdit(item.id)}
                            className="bg-blue-800 text-white pt-2 pb-2 pl-8 pr-8 ml-8 rounded-md"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className="bg-red-800 text-white pt-2 pb-2 pl-8 pr-8 ml-8 rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
