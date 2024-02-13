import { useStore, visibilityFilters } from "../store";
import { MdFilterListAlt } from "react-icons/md";

const VisibilityFilter = () => {
  const { filterTodo } = useStore();
  return (
    <div className="flex gap-1 items-center">
      <select
        onChange={(event) => filterTodo(event.target.value)}
        className="my-3 h-7 bg-gray-50 rounded-sm  border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
      >
        {Object.keys(visibilityFilters).map((filterKey: string) => {
          const currentFilter: string =
            visibilityFilters[filterKey as keyof typeof visibilityFilters];
          return (
            <option key={filterKey} value={currentFilter}>
              {currentFilter}
            </option>
          );
        })}
      </select>
      <MdFilterListAlt size="2em" />
    </div>
  );
};

export default VisibilityFilter;
