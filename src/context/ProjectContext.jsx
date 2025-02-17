import {createContext, useContext, useState} from "react";
import {useAuth} from "./AuthContext.jsx";

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {

  const { api } = useAuth()

  const [taskArray, setTaskArray] = useState([]);
  const [projectArray, setProjectArray] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  function selectProject(id, name) {
    setProjectArray((prev) => [...prev, {id, name}]);
  }

  function showProjects() {
    api.getProjects()
      .then(function(response) {
        console.log(response)
        setProjectArray(response.results)
      })
      .catch((error) => console.log(error))
  }

  function showTasks(project_id) {
    api.getTasks(project_id)
      .then((tasks) => {
        console.log(tasks);
        const filteredTasks = tasks.results.filter(task => task.projectId === project_id);
        setTaskArray(filteredTasks);
        console.log(filteredTasks)
      })
      .catch((error) => console.error(error));
  }

  return (
    <ProjectContext.Provider value={{ setProjectArray, projectArray, selectProject, showProjects, taskArray, showTasks, selectedProjectId, setSelectedProjectId }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  return useContext(ProjectContext);
}