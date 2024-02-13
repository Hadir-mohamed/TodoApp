import { useState } from "react";
import cx from "classnames";
import AddTodo from "./AddTodo";
import { useStore, Todo } from "../store";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { TiInputChecked } from "react-icons/ti";
import { LuRefreshCcw } from "react-icons/lu";
import { toast } from "react-hot-toast";

interface TodoProps {
  todo: Todo;
}
const TodoItem = ({ todo }: TodoProps) => {
  const { removeTodo, toggleCompletedState } = useStore();
  const [isEditable, setIsEditable] = useState(false);

  const handleDeleteClick = () => {
    removeTodo(todo.id);
    toast.success("Todo Deleted Successfully");
  };

  const handleToggleTodo = () => {
    toggleCompletedState(todo.id);
    toast.success("Status Changed Successfully");
  };

  const showEditMode = () => {
    setIsEditable(!isEditable);
  };

  return (
    <li className="flex flex-col items-start leading-10 cursor-pointer p-2 font-mono border-b-[1px] border-current	">
      <div className="w-full">
        <span onDoubleClick={showEditMode}>
          {isEditable ? (
            <AddTodo
              description={todo.description}
              id={todo.id}
              toggleTodoItem={showEditMode}
            />
          ) : (
            <div
              className={cx(
                "todo-item__text",
                todo && todo.completed && "todo-item__text--completed"
              )}
            >
              {todo.description}
            </div>
          )}
        </span>
      </div>
      <div className="flex justify-between gap-20">
        <span onClick={handleToggleTodo}>
          {todo.completed ? (
            <label className=" flex items-center gap-1 w-[170px] cursor-pointer">
              <LuRefreshCcw /> Mark Undone
            </label>
          ) : (
            <label className=" flex items-center gap-1 w-[170px] cursor-pointer">
              <TiInputChecked />
              Mark Compleleted
            </label>
          )}
        </span>
        <div className="flex gap-6">
          <span
            className="cursor-pointer flex items-center gap-1"
            onClick={showEditMode}
          >
            <FiEdit />
            Edit
          </span>
          <span
            className="cursor-pointer flex items-center gap-1 text-red-800"
            onClick={handleDeleteClick}
          >
            <MdDelete />
            Delete
          </span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
