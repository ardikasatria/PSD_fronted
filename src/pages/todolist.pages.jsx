import { useEffect, useState, useContext } from "react";
import TodoItem from "../components/TodoItem.component";
import Notepad from "./notepad.page";
import { UserContext } from "../App"; // Adjust the path as needed
const API_BASE = import.meta.env.VITE_SERVER_DOMAIN + "/todo";
import AnimationWrapper from "../common/page-animation";

function TodoList() {
  const { userAuth: { username: author_username } } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (author_username) {
      GetTodos();
    }
  }, [author_username]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const GetTodos = () => {
    fetch(`${API_BASE}/user/${author_username}`)
      .then(res => res.json())
      .then(data => setItems(data.todos))
      .catch(err => console.log(err));
  };

  const addItem = async () => {
    const data = await fetch(`${API_BASE}/user/${author_username}/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: input,
        completed: false,
      }),
    }).then(res => res.json());
    console.log(data);
    GetTodos();
    setInput("");
  };

  return (
    <AnimationWrapper>
      <section className="flex flex-col lg:flex-row gap-2 p-5 px-3 max-w-10xl mx-auto">
          <div>
            <div>
              <h2>To Do List</h2>
              <p className="mb-5">Buat Rencana Kamu Lebih Teratur</p>
            </div>
            <div className="todolist" >
              <div className="input-container">
                <input
                  className="w-full md:w-100 bg-grey p-4 rounded-full relative placeholder:text-dark-grey"
                  type="text"
                  placeholder="Tambahkan to-do hari ini"
                  value={input}
                  onChange={handleChange}
                />
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-grey hover:bg-black/10"
                  onClick={addItem}
                >
                  <i className="fi fi-rr-add text-2xl block" />
                </button>
              </div>
            </div>
            <div className="todolist">
              {items && items.length > 0 ? (
                items.map((item) => (
                  <TodoItem
                    key={item._id}
                    name={item.name}
                    id={item._id}
                    completed={item.completed}
                    setItems={setItems}
                    GetTodos={GetTodos}
                    username={author_username} // Use author_username instead of username
                  />
                ))
              ) : (
                <p className="mt-5">Belum buat Todo hari ini</p>
              )}
            </div>
            
          </div>
        <Notepad />
        
      </section>
    </AnimationWrapper>
  );
}

export default TodoList;
