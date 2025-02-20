import Auth from "../components/auth/Auth.jsx";
import AddProject from "../components/addProject/AddProject.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import GetProjects from "../components/getProjects/GetProjects.jsx";
import AddTask from "../components/addTask/AddTask.jsx";

function MainPage() {
  const { accessToken, authorize } = useAuth();

  return (
    <div className="todo-container">
      {!accessToken ? (
        <div className="welcome-container">
          <div className="auth-top">
            <img src="/src/images/dogs.jpg" alt="Dogs" />
          </div>
          <div className="auth-container">
            <Auth accessToken={accessToken} authorize={authorize} />
          </div>
          <div className="auth-bottom">Bottom</div>
        </div>
      ) : (
        <div>
          <AddProject />

          <GetProjects />

          <AddTask />
        </div>
      )}
    </div>
  );
}

export default MainPage;
