import Auth from "../components/auth/Auth.jsx";
import AddProject from "../components/addProject/AddProject.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import GetProjects from "../components/getProjects/GetProjects.jsx";
import AddTask from "../components/addTask/AddTask.jsx";

function MainPage() {

  const { accessToken, authorize } = useAuth();

  return (
    <div className="container">
      <div className="auth-container">
        <Auth
          accessToken={accessToken}
          authorize={authorize}
        />
      </div>

      <div className="add-project-container">
        <AddProject

        />
      </div>

      <div className="get-projects-container">
        <GetProjects/>
      </div>

      <div className="add-task-container">
        <AddTask

        />
      </div>
    </div>
  )
}

export default MainPage