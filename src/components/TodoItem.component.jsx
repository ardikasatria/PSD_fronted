import React from "react";
const API_BASE = import.meta.env.VITE_SERVER_DOMAIN + "/todo/user";

function TodoItem(props) {
    const { name, id, completed, setItems, GetTodos, username } = props;

    const toggleComplete = async () => {
        try {
            const response = await fetch(`${API_BASE}/${username}/complete/${id}`, {
                method: "PUT",
            });
            if (!response.ok) {
                throw new Error("Failed to toggle task completion status");
            }
            GetTodos(); // Refresh the list
        } catch (error) {
            console.error("Error toggling task completion status:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${API_BASE}/${username}/delete/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete a task");
            }
            GetTodos(); // Refresh the list
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className={`mt-2 bg-grey hover:bg-black/10 todo-item ${completed ? "check-complete" : ""}`} key={id}>
            <button className="checkbox" onClick={toggleComplete}>
                <i className={`fi ${completed ? "fi-rr-checkbox" : "fi-rr-box"}`} />
            </button>
            <div className="ml-5 text">{name}</div>
            <button className="delete-todo" onClick={() => deleteTodo(id)}>
                <i className="fi fi-rr-trash" />
            </button>
        </div>
    );
}

export default TodoItem;
