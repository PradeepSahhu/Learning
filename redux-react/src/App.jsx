import { useState } from "react";
import { AddTodo } from "./components/AddTodo";
import Todo from "./components/Todo";

function App() {
  const [input, setInput] = useState({
    id: 0,
    text: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <AddTodo
        input={input}
        setInput={setInput}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
      <Todo setInput={setInput} setIsEdit={setIsEdit} isEdit={isEdit} />
    </>
  );
}

export default App;
