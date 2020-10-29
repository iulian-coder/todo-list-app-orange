import "./App.css";
import Todolist from "./components/Todolist";
import TodoForm from "./components/TodoForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App container">
      <Navbar />
      <TodoForm />
      <Todolist />
    </div>
  );
}
export default App;
