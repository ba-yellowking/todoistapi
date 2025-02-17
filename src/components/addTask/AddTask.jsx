import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import Input from "../../ui/input/Input.jsx";
import Dropdown from "../../ui/dropdown/Dropdown.jsx";
import { useProjects } from "../../context/ProjectContext.jsx";

function AddTask() {
  const { api } = useAuth();
  const { projectArray, showProjects, selectedProjectId, setSelectedProjectId } = useProjects();

  const [taskContent, setTaskContent] = useState("");
  const [error, setError] = useState({ task: false, project: false });

  useEffect(() => {
    if (api) {
      showProjects();
    }
  }, [api]);

  function onChangeAddTask(event) {
    setTaskContent(event.target.value);
  }

  function addNewTask() {
    const newError = {
      task: taskContent === "",
      project: !selectedProjectId,
    };

    if (!newError.task && !newError.project) {
      api.addTask({ content: taskContent, projectId: selectedProjectId })
        .then(response => {
          console.log(response);
          setTaskContent("");
          setError({ task: false, project: false });
        })
        .catch((error) => console.log(error));
    } else {
      setError(newError);
    }
  }

  return (
    <div className="add-new-task">
      <Dropdown
        options={projectArray}
        setSelectedProjectId={setSelectedProjectId}
        labelKey="name"
        valueKey="id"
        placeholder="Choose a project"
      />
      {error.project && <p className="error-text">Please select a project</p>}

      <Input
        onChange={onChangeAddTask}
        placeholder={error.task ? "Cannot be blank" : "Task content"}
        value={taskContent}
      />

      <button onClick={addNewTask}>Add new task</button>
    </div>
  );
}

export default AddTask;
