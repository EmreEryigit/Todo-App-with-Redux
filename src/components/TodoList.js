import React from "react";

import { useSelector, useDispatch } from "react-redux";
import {todoSliceActions} from "../store/todoSlice"
function TodoList() {
    const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.items);
    const activeFilter = useSelector((state) => state.todo.activeFilter);
    console.log(activeFilter)
    let filteredItems = todos
    if (activeFilter === "active") {
        filteredItems = todos.filter(todo => !todo.completed)
    }
    if (activeFilter === "completed") {
        filteredItems = todos.filter(todo => todo.completed)
    }

  return (
    <ul className="todo-list">
      {filteredItems.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <div className="view">
            <input className="toggle" type="checkbox" onClick={() => dispatch(todoSliceActions.toogleTodo(todo.id))} checked={todo.completed}  />
            <label>{todo.title}</label>
            <button className="destroy" onClick={() => dispatch(todoSliceActions.removeTodo(todo.id))}></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
