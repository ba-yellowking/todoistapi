import Auth from "../components/auth/Auth.jsx";
import AddProject from "../components/addProject/AddProject.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import GetProjects from "../components/getProjects/GetProjects.jsx";
import AddTask from "../components/addTask/AddTask.jsx";
import GetTasks from "../components/getTasks/GetTasks.jsx";

function MainPage() {
  const { accessToken, authorize } = useAuth();

  return (
    <div className="main-container">
      {!accessToken ? (
        <div className="auth-wrapper">
          <div className="auth-header"></div>
          <div className="auth-content">
            <Auth accessToken={accessToken} authorize={authorize} />
          </div>
          <div className="auth-bottom"></div>
        </div>
      ) : (
          <>
            <div className="main-header"></div>
            <div className="task-manager">
              <div className="task-controls">
                <AddProject />
                <AddTask />
              </div>
              <GetTasks />
              <GetProjects />
            </div>
            <div className="main-bottom"></div>
          </>
      )}
    </div>
  );
}

export default MainPage;
