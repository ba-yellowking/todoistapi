import "./GetTasks.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useProjects } from "../../context/ProjectContext.jsx";
import { useState, useEffect } from "react";

function GetTasks() {
  const { api } = useAuth();
  const { taskArray, setTaskArray } = useProjects();

  // LocalStorage is used for completed tasks because API's method hides them
  // without an opportunity to show them as a separate list
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedTasks = localStorage.getItem("completedTasks");
    return savedTasks ? new Set(JSON.parse(savedTasks)) : new Set();
  });

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(Array.from(completedTasks)));
  }, [completedTasks]);

  // completing tasks
  const completeTask = (taskId) => {
    setCompletedTasks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  // deleting tasks
  const deleteTask = (taskId) => {
    api
      .deleteTask(taskId)
      .then((response) => {
        setTaskArray((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        setCompletedTasks((prev) => {
          const newSet = new Set(prev);
          newSet.delete(taskId);
          return newSet;
        });
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="task-list-container">
      <div className="tasks-list-header">Your tasks</div>
      {taskArray.map((task) => (
        <div className="task-content-container" key={task.id}>
          <div className={`task-content ${completedTasks.has(task.id) ? "completed" : ""}`}>
            {task.content}
          </div>

          <div className="task-actions">
            <div className="task-complete" onClick={() => completeTask(task.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="M10 15.689L6.712 12.4l.688-.688l2.6 2.6l6.6-6.6l.688.688z" />
              </svg>
            </div>

            <div className="task-delete" onClick={() => deleteTask(task.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path fill="currentColor" d="m8.401 16.333l-.734-.727L11.266 12L7.667 8.42l.734-.728L12 11.29l3.574-3.597l.734.727L12.709 12l3.599 3.606l-.734.727L12 12.737z" />
              </svg>
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}

export default GetTasks;
