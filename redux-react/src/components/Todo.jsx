import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { removeTodo } from "../features/todo/todoSlice";

export function Todo() {
  const todos = useSelector((state) => state.todo);

  const dispatch = useDispatch();
  return (
    <div className="mt-6 space-y-4 flex-col justify-center">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex w-1/2 items-center justify-between bg-gray-800 text-white px-4 py-2 rounded shadow"
        >
          <li className="list-none text-lg">{todo.id}</li>
          <li className="list-none text-lg text-white">{todo.text}</li>

          <button
            onClick={() => dispatch(removeTodo(todo.id))}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
