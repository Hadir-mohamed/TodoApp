import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import VisibilityFilters from "./components/VisibilityFilter";
import "./App.css";

function App() {
  return (
    <div className="app pt-7 font-mono">
      <AddTodo />
      <VisibilityFilters />
      <TodoList />
    </div>
  );
}

export default App;
