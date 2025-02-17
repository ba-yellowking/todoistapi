import {useAuth} from "../../context/AuthContext.jsx";
import {useState} from "react";
import Input from "../../ui/input/Input.jsx";
import Dropdown from "../../ui/dropdown/Dropdown.jsx";

function AddTask() {

  const {api} = useAuth()

  const [selectedProjectId, setSelectedProjectId] = useState(null)

  const [taskContent, setTaskContent] = useState("")
  const [error, setError] = useState(false)

  function onChangeAddTask(event) {
    setTaskContent(event.target.value)
  }

  function addNewTask() {
    if (taskContent !== "") {
      api.addTask({ content: taskContent, projectId: selectedProjectId })
        .then((task) => console.log(task))
        .catch((error) => console.log(error))
    } else {
      setError(true)
    }
  }

  return (
    <div className="add-new-task">
      <Dropdown
        setSelectedProjectId={setSelectedProjectId}
      />
      <Input
        onChange={onChangeAddTask}
        placeholder={error ? "Cannot be blank" : "Task content"}
        value={taskContent}
      />
      <button onClick={addNewTask}>Add new task</button>
    </div>
  )
}

export default AddTask