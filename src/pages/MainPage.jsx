import Auth from "../components/auth/Auth.jsx";
import AddProject from "../components/addProject/AddProject.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import GetProjects from "../components/getProjects/GetProjects.jsx";
import AddTask from "../components/addTask/AddTask.jsx";

function MainPage() {
  const { accessToken, authorize } = useAuth();

  return (
    <div className="todo-container">
      <div className="auth-container">
        <Auth accessToken={accessToken} authorize={authorize} />
      </div>

      <AddProject />

      <GetProjects />

      <AddTask />
    </div>
  );
}

export default MainPage;
