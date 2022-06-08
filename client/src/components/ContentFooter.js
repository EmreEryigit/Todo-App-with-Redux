import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { todoSliceActions } from "../store/todoSlice";

function ContentFooter() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.items);
  const completedCount = todos.filter((todo) => !todo.completed).length;

  const activeFilter = useSelector((state) => state.todo.activeFilter);
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{completedCount} </strong>
        item{completedCount > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            onClick={() => dispatch(todoSliceActions.setFilter("all"))}
            className={activeFilter === "all" && "selected"}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            onClick={() => dispatch(todoSliceActions.setFilter("active"))}
            className={activeFilter === "active" && "selected"}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            onClick={() => dispatch(todoSliceActions.setFilter("completed"))}
            className={activeFilter === "completed" && "selected"}
          >
            Completed
          </a>
        </li>
      </ul>

      <button
        onClick={() => dispatch(todoSliceActions.clearCompleted())}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  );
}

export default ContentFooter;
