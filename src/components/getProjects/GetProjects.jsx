import "./GetProjects.css";
import { useState } from "react";
import { useProjects } from "../../context/ProjectContext.jsx";
import GetTasks from "../getTasks/GetTasks.jsx";

function GetProjects() {
  const { projectArray, showTasks, deleteProject } = useProjects();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="project-container">
      <div className="project-header" onClick={toggleDropdown}>
        Your projects
      </div>

      {isOpen && (
        <div className="project-list">
          {projectArray.length > 0 ? (
            projectArray.slice(1).map((option) => (
              <div className="project-item" key={option.id}>
                <div
                  className="project-name"
                  key={option.id}
                  onClick={() => showTasks(option.id)}
                >
                  {option.name}
                </div>

                <div
                  className="project-delete"
                  onClick={() => {
                    deleteProject(option.id);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m8.401 16.333l-.734-.727L11.266 12L7.667 8.42l.734-.728L12 11.29l3.574-3.597l.734.727L12.709 12l3.599 3.606l-.734.727L12 12.737z" />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <div className="get-projects-option">Empty</div>
          )}
        </div>
      )}

    </div>
  );
}

export default GetProjects;
