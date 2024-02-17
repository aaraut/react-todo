import "./App.css";
import { Container, Paper, styled } from "@mui/material";
import Todo from "./Components/Todo";
import { TodoProvider } from "./Context/TodoContext";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 1000,
  minHeight: 100,
  textAlign: "center",
  height: "auto",
}));

function App() {
  return (
    <>
      <TodoProvider>
        <Container className="pt-4 pb-4">
          <DemoPaper square={false} elevation={10}>
            <Todo />
          </DemoPaper>
        </Container>
      </TodoProvider>
    </>
  );
}

export default App;
