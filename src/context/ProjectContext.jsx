import { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const { api } = useAuth();

  const [taskArray, setTaskArray] = useState([]);
  const [projectArray, setProjectArray] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // To add a project
  function addProject(id, name) {
    setProjectArray((prev) => [...prev, { id, name }]);
  }

  // To show projects
  function showProjects() {
    api
      .getProjects()
      .then(function (response) {
        console.log(response);
        setProjectArray(response.results);
      })
      .catch((error) => console.log(error));
  }

  // To delete a project
  const deleteProject = (id) => {
    api
      .deleteProject(id)
      .then((response) => {
        console.log(response);
        setProjectArray((prev) => prev.filter((project) => project.id !== id));
      })
      .catch((error) => console.log(error));
  };

  // To show tasks (projectId)
  function showTasks(project_id) {
    api
      .getTasks(project_id)
      .then((tasks) => {
        const filteredTasks = tasks.results.filter(
          (task) => task.projectId === project_id,
        );
        setTaskArray(filteredTasks);
      })
      .catch((error) => console.error(error));
  }

  return (
    <ProjectContext.Provider
      value={{
        setProjectArray,
        projectArray,
        addProject,
        showProjects,
        taskArray,
        showTasks,
        selectedProjectId,
        setSelectedProjectId,
        deleteProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export function useProjects() {
  return useContext(ProjectContext);
}
