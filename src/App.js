import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo]);
      setNewTodo("");
    }
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
  };

  const saveTodo = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === editIndex ? editText : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText("");
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1>To-Do List</h1>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
          />
          <button onClick={addTodo}>Add</button>
        </div>
        {editIndex !== null ? (
          <div className="edit-container">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Edit todo..."
            />
            <button onClick={saveTodo}>Save</button>
          </div>
        ) : null}
        <TodoList todos={todos} onEdit={editTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
}

function TodoList({ todos, onEdit, onDelete }) {
  return (
    <ul className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          onEdit={() => onEdit(index)}
          onDelete={() => onDelete(index)}
        />
      ))}
    </ul>
  );
}

function TodoItem({ todo, onEdit, onDelete }) {
  return (
    <li className="todo-item">
      <span className="todo-text">{todo}</span>
      <div className="todo-actions">
        <button className="todo-edit" onClick={onEdit}>
          Edit
        </button>
        <button className="todo-delete" onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default App;
