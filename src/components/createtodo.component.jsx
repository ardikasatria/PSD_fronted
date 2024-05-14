import React, { useState } from "react";
import axios from "axios";

function Create() {
    const [task, setTask] = useState()

    const handleAdd = () => {
        axios.post(`${import.meta.env.VITE_SERVER_DOMAIN}/add-todo`, { task: task })
            .then(result => {
                console.log(result);
                setTask(''); // Clear the input field after adding the task
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <input
                className="w-full md:w-80 bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-5"
                type="text"
                placeholder="Tambahkan to-do hari ini"
                onChange={(e) => setTask(e.target.value)}
            />
            
            <button
                className="ml-5 w-12 h-12 rounded-full bg-grey relative hover:bg-black/10"
                type="button"
                onClick={handleAdd}
            >
                <i className="fi fi-rr-add text-2xl block" />
            </button>
        </div>
    );
}

export default Create;
