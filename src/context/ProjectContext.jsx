import {createContext, useContext, useState} from "react";

const ProjectContext = createContext()

export const ProjectProvider = ({ children }) => {

  const [projectArray, setProjectArray] = useState([])

  function selectProject(id, name) {
    setProjectArray((prev) => [...prev, {id, name}]);
  }

  return (
    <ProjectContext.Provider value={{ setProjectArray, projectArray, selectProject }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  return useContext(ProjectContext);
}