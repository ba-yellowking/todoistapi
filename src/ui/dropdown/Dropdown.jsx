import { useState } from "react";

function Dropdown({ options, setSelectedProjectId, labelKey = "name", valueKey = "id", placeholder = "Select an option" }) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(placeholder);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectOption = (option) => {
    setSelectedOption(option[labelKey]);
    setSelectedProjectId(option[valueKey]);
    console.log(option[valueKey])
    setIsOpen(false);
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption} *
      </div>

      {isOpen && (
        <div className="dropdown-list">
          {options.length > 0 ? (
            options.slice(1).map((option) => (
              <div
                className="dropdown-option"
                key={option[valueKey]}
                onClick={() => selectOption(option)}
              >
                {option[labelKey]}
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
