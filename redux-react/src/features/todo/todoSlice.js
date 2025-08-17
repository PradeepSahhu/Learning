import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todo: [
    {
      id: 1,
      text: "hello world",
    },
  ],
};

// reducer (functionality) => bigger version slice

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload,
      };

      state.todo.push(newTodo);
    },
    removeTodo: (state, action) => {
      const id = action.payload;

      const newState = state.todo.filter((item) => item.id !== id);

      state.todo = newState;
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;

      state.todo.map((todo) => {
        if (todo.id === id) {
          todo.text = text;
        }
      });
    },
  },
});

//create the update todo

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
