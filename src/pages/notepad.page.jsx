import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../App"; // Adjust the path as needed
import ReactMarkdown from "react-markdown";
const API_BASE = import.meta.env.VITE_SERVER_DOMAIN + "/todo"; // Adjust this to your backend's base URL

function Notepad() {
  const { userAuth: { username } } = useContext(UserContext);
  const [note, setNote] = useState("");
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/${username}/note`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setNote(data.content);
        }
      })
      .catch((err) => console.error("Error fetching note:", err));
  }, [username]);

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleBlur = () => {
    fetch(`${API_BASE}/${username}/note`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: note }),
    }).catch((err) => console.error("Error updating note:", err));
  };

  return (
    <div className="notepad lg:w-1/2 mt-5 lg:mt-0 lg:ml-10">
      <h2>Notepad</h2>
      <p>Tempel Catatan Kamu</p>
      {editMode ? (
        <textarea
          className="w-full bg-grey p-4 rounded-md placeholder:text-dark-grey"
          placeholder="Write your notes here..."
          value={note}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <ReactMarkdown className="markdown-preview p-4 bg-grey rounded-md">
          {note}
        </ReactMarkdown>
      )}
      <button
        className="mt-2 bg-light-green text-white p-2 rounded"
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? "Preview Markdown" : "Edit"}
      </button>
    </div>
  );
}

export default Notepad;
