import { Box, Button, Card } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import TodoCreator from "./TodoCreator";
import TodoList from "./TodoList";
import { TodoContext } from "../Context/TodoContext";
import { v4 as uuidv4 } from "uuid";

const Todo = () => {
  const [todos, setTodos] = useContext(TodoContext); 

  const [todo, setTodo] = useState(); // Hook used for capturing data of add new todo field  
  const [viewList, setViewList] = useState(todos); // local list used for viewing and on fly sorting.
  
  // To update the local storage on every new entry of todo 
  useEffect(() => {
    todos && localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Perform default sorting on load of component
  useEffect(() => {
    handleDefaultSort(viewList);
  }, [])

  // Method to add new todo
  const handleSubmit = (e) => {
    if (todo !== "") {
      const newToDo = [
        ...todos,
        {
          title: todo,
          created_at: new Date().toISOString(),
          completed_at: null,
          id: uuidv4(),
        },
      ];
      setTodos(newToDo);
      handleDefaultSort(newToDo);
      setViewList(newToDo)
      setTodo("");
    }
  };

  // Method to toggle complete state of todo item
  const handleCompleteToggle = (e, id) => {
    const todoCopy = [...todos];
    const targetObj = todoCopy.find((element) => element.id === id);
    if (targetObj) {
      targetObj.completed_at =
      targetObj.completed_at === null ? new Date() : null;
    }
    setTodos(todoCopy);
    handleDefaultSort(todoCopy);
    setViewList(todoCopy);
  };

  // Method to delete todo item from list
  const handleDeleteItem = (e, id) => {
    const todoCopy = [...todos];
    const targetObj = todoCopy.findIndex((element) => element.id === id);
    if (targetObj !== -1) {
      todoCopy.splice(targetObj, 1);
    }
    setTodos(todoCopy);
    handleDefaultSort(todoCopy);
    setViewList(todoCopy);
  };
  
  // Method to perform sort to show active items at top and completed at bottom
  const handleDefaultSort = (todoCopy) => {
    todoCopy.sort(
      ({ completed_at: a }, { completed_at: b }) =>
        (b === null) - (a === null) || a - b
    );
  }

  // Method to sort active todo's based on latest created_at
  const handleActiveSort = () => {
    const sorted = [...viewList];
    sorted.sort((x, y) => {
      return new Date(y.created_at).getTime() - new Date(x.created_at).getTime();
    });
    handleDefaultSort(sorted);
    setViewList(sorted);
  };

  // Method to sort completed todo's in assending order of completed_at
  const handleCompletedSort = () => {
    const sorted = [...viewList].sort((x, y) => {return new Date(y.completed_at).getTime() - new Date(x.completed_at).getTime()})
    handleDefaultSort(sorted);
    setViewList(sorted);
  }

  return (
    <>
      <Box className="mt-4">
        <Card variant="outlined" className="pt-4 pb-4">
          <h3>To Do App</h3>
          <form onSubmit={handleSubmit}>
            <TodoCreator
              todo={todo}
              setTodo={setTodo}
              handleSubmit={handleSubmit}
            />
          </form>
        </Card>
        <Card variant="outlined" className="p-4">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>To do list</h3>
            {todos.length >= 1 ? (
              <span>
                <Button onClick={handleActiveSort}>Sort Active Items</Button>
                <Button onClick={handleCompletedSort}>Sort Completed Items</Button>
              </span>
            ) : null}
          </div>

          <TodoList
            todoList={viewList}
            handleCompleteToggle={handleCompleteToggle}
            handleDeleteItem={handleDeleteItem}
          />
        </Card>
      </Box>
    </>
  );
};

export default Todo;
