import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getTodoAsync,
  deleteTodoAsync,
  toggleTodoAsync,
} from "../store/todoSlice";
function TodoList() {
  const isLoading = useSelector((state) => state.todo.isLoading);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.items);
  const activeFilter = useSelector((state) => state.todo.activeFilter);
  const loading = useSelector((state) => state.todo.isLoading);
  console.log(activeFilter);
  useEffect(() => {
    dispatch(getTodoAsync());
  }, [dispatch]);
  const handleDestroy = async(id) => {
       await dispatch(deleteTodoAsync(id));
  }
  const handleToggle = async(id,completed) => {
     dispatch(toggleTodoAsync({id, data: {completed}}));
  }

  let filteredItems = todos;
  if (activeFilter === "active") {
    filteredItems = todos.filter((todo) => !todo.completed);
  }
  if (activeFilter === "completed") {
    filteredItems = todos.filter((todo) => todo.completed);
  }
  if (loading) {
    return <div>Loading...</div>;
  }
 
  return (
    <ul className="todo-list">
      {filteredItems.map((todo) => (
        <li key={todo.id} className={todo.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              onClick={() => handleToggle(todo.id, !todo.completed)}
              defaultChecked={!todo.completed && null}
            />
            <label>{todo.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(todo.id)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
