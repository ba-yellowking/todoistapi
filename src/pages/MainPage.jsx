import Auth from "../components/auth/Auth.jsx";
import AddProject from "../components/addProject/AddProject.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import GetProjects from "../components/getProjects/GetProjects.jsx";
import AddTask from "../components/addTask/AddTask.jsx";
import GetTasks from "../components/getTasks/GetTasks.jsx";
import {useProjects} from "../context/ProjectContext.jsx";

function MainPage() {
  const { accessToken, authorize } = useAuth();
  const { taskArray } = useProjects();

  return (
    <div className="todo-container">
      {!accessToken ? (
        <div className="welcome-container">
          <div className="auth-top"></div>
          <div className="auth-container">
            <Auth accessToken={accessToken} authorize={authorize} />
          </div>
          <div className="auth-bottom"></div>
        </div>
      ) : (
          <>
            <div className="header"></div>

            <div className="top-section">
              <GetProjects />

              <GetTasks taskArray={taskArray} />

              <div className="top-right-section">
                <AddProject />
                <AddTask />
              </div>
            </div>

            <div className="bottom"></div>
          </>

      )}
    </div>
  );
}

export default MainPage;
