import React, { useState } from "react";
import Task from "../Task";
import { xxhash3 } from "hash-wasm";
import "./TaskContainer.css";

type TaskProps = {
  tasks: {
    title: string;
    description: string;
    completed: boolean;
    id: string;
  }[];
  setTasks: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
        description: string;
        completed: boolean;
        id: string;
      }[]
    >
  >;
  dark: boolean;
};

const TaskContainer = ({ tasks, setTasks, dark }: TaskProps) => {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    completed: false,
    id: "",
  });

  async function run(str: string) {
    const id = await xxhash3(str);
    return id;
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (todo.title) {
      const randomNumber = Math.floor(Math.random() * 500) + 1;
      todo.id = await run(todo.title + todo.description + randomNumber);

      const newTasks = [...tasks, { ...todo }];
      setTasks(newTasks);
      setTodo({ title: "", description: "", completed: false, id: "" });
      localStorage.setItem("myTodoTasks", JSON.stringify(newTasks));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <div className="tasks-container">
      <form
        className="input-form"
        action="handleSubmit"
        onSubmit={handleSubmit}
      >
        <input
          className="task-input"
          name="title"
          type="text"
          placeholder="Enter Title"
          onChange={handleChange}
          value={todo.title}
        />
        <input
          className="task-input"
          name="description"
          type="text"
          placeholder="Enter Description"
          onChange={handleChange}
          value={todo.description}
        />
        <button className="add-btn" type="submit">
          Add
        </button>
      </form>

      <div className="box-task-main">
        {tasks?.map((task, i) => {
          return (
            <Task
              task={task}
              tasks={tasks}
              setTasks={setTasks}
              index={i}
              dark={dark}
              key={task.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskContainer;
