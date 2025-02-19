import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useProjects } from "../../context/ProjectContext.jsx";
import "./AddProject.css";
import Button from "../../ui/Button/Button.jsx";
import InputUI from "../../ui/input/InputUI.jsx";

function AddProject() {
  const { api } = useAuth();
  const { addProject } = useProjects();

  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(false);

  function onChangeAddProject(event) {
    setProjectName(event.target.value);
  }

  function addNewProject() {
    if (projectName !== "") {
      api
        .addProject({ name: projectName })
        .then((response) => {
          console.log(response);
          addProject(response.id, response.name);
          setProjectName("");
        })
        .catch((error) => console.error(error));
    } else {
      setError(true);
    }
  }

  return (
    <div className="add-project-container">
      <div className="add-new-project">
        <InputUI
          onChange={onChangeAddProject}
          placeholder={error ? "Cannot be blank" : "Project name"}
          value={projectName}
          className="add-project-input-style"
        ></InputUI>

        <Button
          title="Add a new project"
          callback={addNewProject}
          className="add-project-button-style"
        ></Button>
      </div>
    </div>
  );
}

export default AddProject;
