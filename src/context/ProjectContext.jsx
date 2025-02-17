import {createContext, useContext, useState} from "react";
import {useAuth} from "./AuthContext.jsx";

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {

  const { api } = useAuth()

  const [projectArray, setProjectArray] = useState([])

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

  return (
    <ProjectContext.Provider value={{ setProjectArray, projectArray, selectProject, showProjects }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  return useContext(ProjectContext);
}