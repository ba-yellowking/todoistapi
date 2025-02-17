import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { TodoistApi } from "@doist/todoist-api-typescript";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const clientId = "68db19b331c44ee3a72205cf0d041970";
  const clientScope = "data:read,data:read_write,data:delete,task:add,project:delete";
  const state = Math.random().toString(36).substring(7);
  const clientSecret = "27bed25287da4011b827ae871da5c920";
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  const redirectUri = "http://localhost:5176/";

  const authUrl = `https://todoist.com/oauth/authorize?client_id=${clientId}&scope=${clientScope}&state=${state}`;

  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken") || null);
  const [api, setApi] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");

    if (accessToken || storedToken) {
      setApi(new TodoistApi(accessToken || storedToken));
    } else if (code && !accessToken && !storedToken) {
      exchangeCodeForToken(code);
    }
  }, [accessToken, code]);

  function authorize() {
    window.location.href = authUrl;
  }

  async function exchangeCodeForToken(code) {
    try {
      const response = await axios.post("https://todoist.com/oauth/access_token", {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: redirectUri,
      });
      const token = response.data.access_token;
      setAccessToken(token);
      localStorage.setItem("accessToken", token);
      setApi(new TodoistApi(token));
      window.history.replaceState({}, "", "/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ accessToken, authorize, api }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};