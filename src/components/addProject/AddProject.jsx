import { useState } from "react";
import Input from "../../ui/input/Input.jsx";
import {useAuth} from "../../context/AuthContext.jsx";
import {useProjects} from "../../context/ProjectContext.jsx";

function AddProject() {

  const { api } = useAuth();
  const { selectProject, projectArray } = useProjects()

  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(false)

  function onChangeAddProject(event) {
    setProjectName(event.target.value);
  }

  function addNewProject() {
    if (projectName !== "") {
      api.addProject({ name: projectName })
        .then(response => {
          console.log(response);
          selectProject(response.id, response.name)
          setProjectName("");
        })
        .catch(error => console.error(error));
    } else {
      setError(true)
    }
  }

  return (
    <div className="add-new-project">
      <Input
        onChange={onChangeAddProject}
        placeholder={error ? "Cannot be blank" : "Project name"}
        value={projectName}
      />
      <button onClick={addNewProject}>Add new project</button>
    </div>
  );
}

export default AddProject;