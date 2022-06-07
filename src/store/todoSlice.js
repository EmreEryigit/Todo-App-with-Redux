import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "@reduxjs/toolkit";
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
            }
        ],
        activeFilter: "all",
    },
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.items.push(action.payload);
            },
            prepare: ({title}) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        completed: false,
                    },
                }
            }
        },
        toogleTodo: (state, action) => {
            const todo = state.items.find(todo => todo.id === action.payload);
            todo.completed = !todo.completed;
        },
        removeTodo: (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload);
        },
        setFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            state.items = state.items.filter(todo => !todo.completed);
        }
    }
})
export const todoSliceActions = todoSlice.actions;
export default todoSlice