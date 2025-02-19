import "./GetTasks.css";
import { useAuth } from "../../context/AuthContext.jsx";

function GetTasks({ taskArray }) {
  const { api } = useAuth();

  // To close a task
  const completeTask = (taskId) => {
    api
      .closeTask(taskId)
      .then((isSuccess) => console.log(isSuccess))
      .catch((error) => console.log(error));
  };

  // To delete a task
  const deleteTask = (taskId) => {
    api
      .deleteTask(taskId)
      .then((isSuccess) => console.log(isSuccess))
      .catch((error) => console.log(error));
  };

  return (
    <div className="tasks-container">
      {taskArray.map((task) => (
        <div className="task-content" key={task.id}>
          {task.content}

          <div className="task-content-functions">
            <div className="finish-task" onClick={() => completeTask(task.id)}>
              &#x2705;
            </div>

            <div
              className="delete-task"
              onClick={() => {
                deleteTask(task.id);
              }}
            >
              &times;
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GetTasks;
