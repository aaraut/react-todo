import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoProvider = (props) => {

    const getTodos = JSON.parse(localStorage.getItem('todos'));
    const [todos, setTodos] = useState(getTodos ? getTodos : []);
    return (
        <TodoContext.Provider value={[todos, setTodos]}>
            {props.children}
        </TodoContext.Provider>
    )
}