import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../store";
import { toast } from "react-hot-toast";

const validationSchema = z.object({
  description: z.string().min(4, { message: "Description is required" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface FormInitialValues {
  description?: string;
  id?: string;
  toggleTodoItem?: () => void;
}

const AddTodo = ({ description, id, toggleTodoItem }: FormInitialValues) => {
  const { addTodo, updateTodo } = useStore();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  useEffect(() => {
    const updatedDefaultValues = {
      description,
    };
    reset(updatedDefaultValues);
  }, [reset, id, description]);

  useEffect(() => {
    if (errors.description?.message) {
      toast.error(errors?.description?.message);
    }
  }, [errors.description]);

  const onSubmit: SubmitHandler<FormInitialValues> = (data) => {
    if (data.description) {
      if (id) {
        updateTodo(data.description, id);
        toggleTodoItem && toggleTodoItem();
        toast.success("Todo Updated Successfully");
      } else {
        addTodo(data.description);
        toast.success("Todo Added Successfully");
      }
      setValue('description','')
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-row items-center"
    >
      <input
        className="bg-gray-50 rounded-sm h-7 mr-3 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
        {...register("description")}
      />
      <button
        type="submit"
        className="add-todo bg-sky-800 px-7 py-[3px] rounded-sm"
      >
        {id ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default AddTodo;
