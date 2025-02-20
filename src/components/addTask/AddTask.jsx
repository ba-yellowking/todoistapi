import "./AddTask.css";
import { useAuth } from "../../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import InputUI from "../../ui/input/InputUI.jsx";
import Dropdown from "../../ui/dropdown/Dropdown.jsx";
import { useProjects } from "../../context/ProjectContext.jsx";
import Button from "../../ui/button/Button.jsx";

function AddTask() {
  const { api } = useAuth();
  const {
    projectArray,
    showProjects,
    selectedProjectId,
    setSelectedProjectId,
  } = useProjects();

  const [taskContent, setTaskContent] = useState("");
  const [error, setError] = useState({ task: false, project: false });

  useEffect(() => {
    if (api && projectArray.length === 0) {
      showProjects();
    }
  }, [api, projectArray]);

  function onChangeAddTask(event) {
    setTaskContent(event.target.value);
  }

  function addNewTask() {
    const newError = {
      task: taskContent === "",
      project: !selectedProjectId,
    };

    if (!newError.task && !newError.project) {
      api
        .addTask({ content: taskContent, projectId: selectedProjectId })
        .then((response) => {
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
    <div className="add-task-container">
      <div className="add-new-task">
        <Dropdown
          options={projectArray}
          setSelectedProjectId={setSelectedProjectId}
          labelKey="name"
          valueKey="id"
          placeholder="Choose the project"
          className={{
            container: "add-task-dropdown-container",
            header: "add-task-dropdown-header",
            optionContainer: "dropdown-option-container",
            list: "add-task-dropdown-list",
            option: "add-task-dropdown-option",
          }}
        />
        {error.project && <p className="error-text">Please select a project</p>}

        <InputUI
          onChange={onChangeAddTask}
          placeholder={error.task ? "Cannot be blank" : "Task content"}
          value={taskContent}
          className="add-task-input-style"
        />

        <Button
          title="Add new task"
          callback={addNewTask}
          className="add-task-button-style"
        ></Button>
      </div>
    </div>
  );
}

export default AddTask;
