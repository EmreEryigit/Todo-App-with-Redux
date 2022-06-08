import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getTodoAsync = createAsyncThunk("todos/getTodoAsync", async () => {
  const response = await axios("http://localhost:3001/todos");
  return response.data;
});
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (title) => {
    const response = await axios.post("http://localhost:3001/todos", title);
    return response.data;
  }
);
export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (id) => {
    await axios.delete(
      `http://localhost:3001/todos/${id}`
    );
    return id;
  }
);
export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const response = await axios.patch(
      `http://localhost:3001/todos/${id}`,
      data
    );
    return response.data;
  }
);

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [
      {
        id: nanoid(),
        title: "Learn JavaScript",
        completed: true,
      },
      {
        id: nanoid(),
        title: "Learn React",
        completed: false,
      },
    ],
    activeFilter: "all",
    isLoading: false,
    error: false,
  },
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    // clearCompleted: (state) => {
    //   state.items = state.items.filter((todo) => !todo.completed);
    // },
  },
  extraReducers: {
    [getTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    // add todo
    [addTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items.push(action.payload);
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = true;
    },
    // delete todo
    [deleteTodoAsync.pending]: (state, action) => {
      state.isLoading = false;
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      const id = action.payload;
        state.isLoading = false;
        state.items = state.items.filter((todo) => todo.id !== id);
        
    },
    [deleteTodoAsync.rejected]: (state, action) => {
      state.error = true;
      state.isLoading = false;
    },

    //toggle todo
    
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((todo) => todo.id === id);
      state.items[index].completed = completed;
    },
    
  },
  
});
export const todoSliceActions = todoSlice.actions;
export default todoSlice;
