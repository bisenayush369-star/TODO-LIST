import { useState, useEffect  } from "react";
import Navbar from "./Components/Navbar";
import { v4 as uuidv4 } from "uuid";

function App() {

const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
});

const [editId, setEditId] = useState(null);
const [showFinished, setShowFinished] = useState(true);

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

const handleEdit = (item) => {
  setTodo(item.todo);   // put text into input box
  setEditId(item.id);  // remember which todo is editing
};

const handleDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this todo?")) return;

  setTodos(todos.filter((item) => item.id !== id));
};


const handleAdd = () => {
if (todo.trim() === "") return;

if (editId) {
  setTodos(
    todos.map((item) =>
      item.id === editId ? { ...item, todo } : item
    )
  );
  setEditId(null);
} else {
  setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
}
setTodo("");
}

const handleChange = (e) => {
  setTodo(e.target.value);
};

const handleCheckbox = (id) => {
  setTodos(
    todos.map((item) =>
      item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    )
  );
};

  return (
    <>
<Navbar />
  <div className="mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-[95%] md:w-[520px] lg:w-[650px]">
<h2 className="text-xl font-bold text-center mb-2">
  iTask - Manage your todos at one place
</h2>

<h3 className="text-lg font-bold mb-2">Add a Todo</h3>

<div className="flex gap-2 items-center">
  <input
    onChange={handleChange}
    value={todo}
    type="text"
    className="flex-1 px-3 py-2 rounded-full"
  />
 <button
  onClick={handleAdd}
  className="bg-violet-700 hover:bg-violet-800 px-4 py-1.5 ml-2 rounded-full text-white text-sm font-medium"
>
  {editId ? "Save" : "Save"}
</button>
</div>

  <div className="flex items-center gap-2 my-3">
  <input
    type="checkbox"
    checked={showFinished}
    onChange={() => setShowFinished(!showFinished)}
  />
  <span className="text-sm">Show Finished</span>
</div>

<hr className="border-violet-300 mb-4" />

  <h2 className="text-lg font-bold mt-6">Your Todos</h2>
<div className="todos">
  {todos.length ===0 && (<div className='m-5'><p>No todos to display!</p></div>)}
  {todos
  .filter(item => showFinished || !item.isCompleted)
  .map((item) => (


<div key={item.id} className="todo grid grid-cols-[auto_1fr_auto] items-center gap-3 py-1 w-full">
 <input
  type="checkbox"
  checked={item.isCompleted}
  onChange={() => handleCheckbox(item.id)}
  className="accent-violet-700 w-4 h-4"
 />
 <span
  className={`flex-1 text-sm leading-tight ${item.isCompleted ? "line-through text-gray-500" : ""
  }`}
>
  {item.todo}
</span>

  <div className="buttons flex gap-2 ml-auto">

  <button
  onClick={() => handleEdit(item)}
  className="bg-violet-800 hover:bg-violet-950 w-8 h-8 flex items-center justify-center rounded-md text-white"
>
  <span className="material-icons text-sm">edit</span>
</button>

     <button
  onClick={() => handleDelete(item.id)}
  className="bg-violet-800 hover:bg-violet-950 w-8 h-8 flex items-center justify-center rounded-md text-white"
>
  <span className="material-icons text-sm">delete</span>
</button>

      </div>
    </div>
  ))}
</div>
</div>

    </>
  );
}

export default App;
