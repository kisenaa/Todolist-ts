import "./app.css";
import { useState, useEffect } from "react";
import Switch from "react-switch";
import { BsSunFill, BsFillMoonStarsFill } from "react-icons/bs";
import TaskContainer from "../components/TaskContainer";

type Task = {
  title: string;
  description: string;
  completed: boolean;
  id: string;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const myTodo = localStorage.getItem("myTodoTasks");
    if (myTodo) {
      setTasks(JSON.parse(myTodo));
    }
  }, []);

  return (
    <div className="app">
      <div className="app-title-container">
        <h1 className="app-title">To Dos List</h1>
      </div>
      <Switch
        checked={dark}
        onChange={() => setDark(!dark)}
        uncheckedIcon={
          <div className="sun-btn">
            <BsSunFill size={18} />
          </div>
        }
        checkedIcon={
          <div className="moon-btn">
            <BsFillMoonStarsFill size={18} />
          </div>
        }
      />

      <TaskContainer tasks={tasks} setTasks={setTasks} dark={dark} />
    </div>
  );
};

export default App;
