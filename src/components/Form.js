import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { nanoid } from "@reduxjs/toolkit";
import {todoSliceActions} from "../store/todoSlice"
function Form() {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(todoSliceActions.addTodo({title}));
        setTitle("")
    }
  return (
    <form onSubmit={submitHandler}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </form>
  );
}

export default Form;
