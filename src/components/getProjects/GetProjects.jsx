import {useAuth} from "../../context/AuthContext.jsx";
import {useState} from "react";

function GetProjects() {

  const { api } = useAuth()

  const [projects, setProjects] = useState([])
  const [isFetched, setIsFetched] = useState(false)

  function showProjects() {
    setIsFetched(true)
    api.getProjects()
      .then(function(response) {
        console.log(response)
        setProjects(response.results)
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="get-projects">
      <button onClick={showProjects}>Get projects</button>

      {isFetched && projects.length === 1 ? (
        <p>No projects</p>
      ) : (
        projects.slice(1).map((item) => (
          <div key={item.id}>{item.name}</div>
        ))
      )}
    </div>
  )
}

export default GetProjects