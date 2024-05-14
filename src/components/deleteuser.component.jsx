import React, { useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../App";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DeleteUserPage = () => {
    const { userAuth: { access_token }, setUserAuth } = useContext(UserContext);
    const [confirmUsername, setConfirmUsername] = useState("");
    const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

    const handleDeleteUser = async (e) => {
        e.preventDefault();

        if (!confirmUsername) {
            return toast.error("Please enter your username");
        }

        if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
            return;
        }

        try {
            const response = await axios.delete(`${import.meta.env.VITE_SERVER_DOMAIN}/delete-user/${confirmUsername}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
            });

            if (response.status === 200) {
                // Remove access token from storage
                localStorage.removeItem("access_token");
                // Set userAuth to null
                setUserAuth(null);
                // Redirect to the home page
                navigate("/");
                toast.success("Your account has been deleted");
            } else {
                throw new Error(response.data.message || 'Failed to delete user');
            }
        } catch (error) {
            console.error("Network error:", error);
            toast.error(error.response.data.message || "Failed to delete user");
        }
    };

    return (
        access_token ?
            <div className="p-5">
                <Toaster />
                <h1 className="text-xl font-semibold mb-4">Delete User</h1>
                <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
                <form onSubmit={handleDeleteUser}>
                    <input
                        type="text"
                        placeholder="Enter your username"
                        className="border border-gray-300 rounded px-3 py-2 mr-2"
                        value={confirmUsername}
                        onChange={(e) => setConfirmUsername(e.target.value)}
                    />
                    <button
                        className="btn-light px-4 py-2 rounded hover:bg-red"
                        type="submit">Delete Account</button>
                </form>
            </div>
            :
            <Navigate to="/" />
    );
};

export default DeleteUserPage;
