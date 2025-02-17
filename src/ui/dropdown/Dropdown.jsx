import { useState } from "react";
import { useProjects } from "../../context/ProjectContext.jsx";

function Dropdown({ setSelectedProjectId }) {

  const { projectArray } = useProjects();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Choose a project");

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectOption = (option) => {
    setSelectedOption(option.name);
    setSelectedProjectId(option.id)
    setIsOpen(false);
  };

  return (

    <div className="dropdown-container">

      <div
        className="dropdown-header"
        onClick={toggleDropdown}
      >
        {selectedOption}
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {projectArray.length > 0 ? (
            projectArray.map((option) => (
              <div
                className="dropdown-option"
                key={option.id}
                onClick={() => selectOption(option)}
              >
                {option.name}
              </div>
            ))
          ) : (
            <div className="dropdown-option">Empty</div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
