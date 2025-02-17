import { useState } from "react";
import {useProjects} from "../../context/ProjectContext.jsx";

function GetProjects() {

  const { projectArray } = useProjects()

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="get-projects-header" onClick={toggleDropdown}>
        <div>Project list *</div>
      </div>

      {isOpen && (
        <div className="get-projects-list">
          {projectArray.length > 0 ? (
            projectArray.slice(1).map((option, index) => (
              <div
                className="get-projects-option"
                key={index}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="get-projects-option">Empty</div>
          )}
        </div>
      )}
    </>
  );
}

export default GetProjects;
