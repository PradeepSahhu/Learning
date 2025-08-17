import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, updateTodo } from "../features/todo/todoSlice";

export function AddTodo({ input, setInput, isEdit, setIsEdit }) {
  //   const [input, setInput] = useState("");
  const dispath = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();

    // dispath -> use reducer -> make changes int the store.
    dispath(addTodo(input.text));

    setInput({
      id: 0,
      text: "",
    });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispath(updateTodo({ id: input.id, text: input.text }));
    setIsEdit(false);
    setInput({
      id: 0,
      text: "",
    });
  };
  return (
    <form
      onSubmit={isEdit ? handleEdit : addTodoHandler}
      className="space-x-3 mt-12"
    >
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500
                   focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100
                   py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input.text}
        onChange={(e) =>
          setInput((prev) => ({ ...prev, text: e.target.value }))
        }
      />
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6
                   focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        {isEdit ? "Edit " : "Add Todo"}
      </button>
    </form>
  );
}
