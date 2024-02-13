import React from "react";
import TodoItem from "./Todo";
import { useStore, Todo, visibilityFilters } from "../store";
import { MdNoAdultContent } from "react-icons/md";

const TodoList = () => {
  const { todos, filterBy } = useStore();
  // const todos = useSelector((state: any) => state.todos.todos);
  // const filter = useSelector((state) => state.todos.filterBy);

  const filteredTodo = () => {
    if (filterBy === visibilityFilters.SHOW_COMPLETED) {
      return todos.filter((todo) => todo.completed === true);
    }
    if (filterBy === visibilityFilters.SHOW_ACTIVE) {
      return todos.filter((todo) => todo.completed === false);
    }
    return todos;
  };

  return (
    <>
      <ul className="mt-1 text-left list-none">
        {filteredTodo() && filteredTodo().length ? (
          filteredTodo().map((todo: Todo) => {
            return <TodoItem key={`todo-${todo.id}`} todo={todo} />;
          })
        ) : (
          <div className="flex flex-col items-center bg-black p-10 text-center rounded-md">
            <MdNoAdultContent size="10em" />
            <p className="text-center"> You have nothing to do!</p>
          </div>
        )}
      </ul>
    </>
  );
};

export default TodoList;
