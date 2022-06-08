import React, {useState} from "react";
import {useDispatch} from "react-redux"
import { addTodoAsync } from "../store/todoSlice";

function Form() {
    const [title, setTitle] = useState("");
    const dispatch = useDispatch();
    const submitHandler = async(e) => {
        e.preventDefault();
       await dispatch(addTodoAsync({title}));
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
