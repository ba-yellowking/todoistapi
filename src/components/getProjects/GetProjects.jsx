import "./GetProjects.css";
import { useState } from "react";
import { useProjects } from "../../context/ProjectContext.jsx";
import GetTasks from "../getTasks/GetTasks.jsx";

function GetProjects() {
  const { projectArray, taskArray, showTasks, deleteProject } = useProjects();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="get-projects-container">
      <div className="get-projects-header" onClick={toggleDropdown}>
        <div>Your projects</div>
      </div>

      {isOpen && (
        <div className="get-projects-list">
          {projectArray.length > 0 ? (
            projectArray.slice(1).map((option) => (
              <div className="option-container">
                <div
                  className="get-projects-option"
                  key={option.id}
                  onClick={() => showTasks(option.id)}
                >
                  {option.name}
                </div>

                <div
                  className="delete-project"
                  onClick={() => {
                    deleteProject(option.id);
                  }}
                >
                  &times;
                </div>
              </div>
            ))
          ) : (
            <div className="get-projects-option">Empty</div>
          )}
        </div>
      )}

      <GetTasks taskArray={taskArray} />
    </div>
  );
}

export default GetProjects;
