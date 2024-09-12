export default function MainSection () {
    return (
        <>
         <div className="container bg-blue-100 m-auto p-2" style={{ minHeight: "100vh" }}>
            <h1 className="text-black text-4xl p-4 font-bold cursor-cell text-center">Todo Application</h1>
            <div className="form-todo text-center">
                    <input type="text" className="w-1/2 p-2 rounded-md" placeholder="Enter Todo" />

                        <button className="bg-blue-800 text-white pt-2 pb-2 pl-8 pr-8 ml-8 rounded-md">Add</button>
                </div>
                <div className="todos p-2">
                    <h3 className="text-black text-2xl font-bold underline text-center mt-8 mb-8">Read Your Todos</h3>
                    <div className="para-btn flex justify-center items-center mt-8 mb-8">
                        <p className="text-1xl">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                        <button className="bg-blue-800 text-white pt-2 pb-2 pl-8 pr-8 ml-8 rounded-md">Edit</button>
                        <button className="bg-blue-800 text-white pt-2 pb-2 pl-8 pr-8 ml-8 rounded-md">Delete</button>
                    </div>
                </div>
            </div>
        </>
    )
}