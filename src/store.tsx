import create from "zustand";
import { v4 as uuidv4 } from "uuid";

export type Todo = {
  id: string;
  description: string;
  completed: boolean;
};

export const visibilityFilters = {
  SHOW_ALL: "all",
  SHOW_COMPLETED: "completed",
  SHOW_ACTIVE: "incomplete",
};

interface TodoState {
  todos: Todo[];
  addTodo: (description: string) => void;
  updateTodo: (id: string, description: string) => void;
  removeTodo: (id: string) => void;
  toggleCompletedState: (id: string) => void;
  filterBy: string;
  filterTodo: (filter: string) => void;
}

const getInitialTodos = () => {
  const todosItems = localStorage.getItem("TODO_LIST")
    ? JSON.parse(localStorage.getItem("TODO_LIST") || "")
    : [];
  return todosItems;
};

export const useStore = create<TodoState>((set) => ({
  todos: getInitialTodos(),
  filterBy: visibilityFilters.SHOW_ALL,
  filterTodo: (type: string) => {
    set(() => ({
      filterBy: type,
    }));
  },
  addTodo: (description: string) => {
    set((state) => {
      const currentTodos = [
        ...state.todos,
        {
          id: uuidv4(),
          description,
          completed: false,
        } as Todo,
      ];
      localStorage.setItem("TODO_LIST", JSON.stringify(currentTodos));
      return {
        todos: currentTodos,
      };
    });
  },
  updateTodo: (description: string, id: string) => {
    set((state) => {
      const currentTodos: Todo[] = state.todos.map((todo) =>
        todo.id === id ? ({ ...todo, description } as Todo) : todo
      );
      localStorage.setItem("TODO_LIST", JSON.stringify(currentTodos));
      return {
        todos: currentTodos,
      };
    });
  },
  removeTodo: (id) => {
    set((state) => {
      const currentTodos: Todo[] = state.todos.filter((todo) => todo.id !== id);
      localStorage.setItem("TODO_LIST", JSON.stringify(currentTodos));
      return {
        todos: currentTodos,
      };
    });
  },
  toggleCompletedState: (id) => {
    set((state) => {
      const currentTodos: Todo[] = state.todos.map((todo) =>
        todo.id === id
          ? ({ ...todo, completed: !todo.completed } as Todo)
          : todo
      );
      localStorage.setItem("TODO_LIST", JSON.stringify(currentTodos));
      return {
        todos: currentTodos,
      };
    });
  },
}));
