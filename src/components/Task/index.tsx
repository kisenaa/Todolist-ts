import React from "react";
import "./task.css";
import { MdCancel, MdOutlineTaskAlt } from "react-icons/md";

type TaskProps = {
  task: {
    completed: boolean;
    title: string;
    description: string;
    id: string;
  };
  tasks: {
    completed: boolean;
    title: string;
    description: string;
    id: string;
  }[];
  setTasks: React.Dispatch<
    React.SetStateAction<
      {
        completed: boolean;
        title: string;
        description: string;
        id: string;
      }[]
    >
  >;
  index: number;
  dark: boolean;
};

const Task = ({ task, tasks, setTasks, index, dark }: TaskProps) => {
  const handleComplete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const saveToLocal = (name: string, data: any) => {
    localStorage.setItem(name, JSON.stringify(data));
  };
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
    saveToLocal("myTodoTasks", newTasks);
  };

  return (
    <div className="box-task-container">
      <div className="box-task">
        <div
          className="box-task-title"
          style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
          {task.title}
        </div>
        <div
          className="box-task-description"
          style={{ textDecoration: task.completed ? "line-through" : "" }}
        >
          {task.description}
        </div>
      </div>
      <div className="box-task-action">
        <button
          className="task-completed box-task-btn"
          onClick={handleComplete}
          style={{
            backgroundColor: task.completed ? "#27ce4b" : "",
            color: task.completed ? "#fff" : "",
          }}
        >
          <MdOutlineTaskAlt size={20} />
        </button>
        <button
          className="task-remove box-task-btn"
          onClick={(e) => handleRemove(e)}
        >
          <MdCancel size={20} />
        </button>
      </div>
    </div>
  );
};

export default Task;
