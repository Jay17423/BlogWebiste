import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./routes/PrivateRoute";
import Homepage from "./components/Homepage";
import { addUser, removeUser } from "./utils/userSlice";
import MyBlog from "./components/MyBlog";
import UpdateBlog from "./components/UpdateBlog";

function AppWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // new state variable

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setLoading(false); // no token, stop loading
      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/v1/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(
          addUser({
            username: res.data.username,
            id: res.data.id,
            token: token,
          })
        );
      })
      .catch(() => {
        Cookies.remove("token");
        dispatch(removeUser());
        navigate("/login");
      })
      .finally(() => setLoading(false)); // stop loading once request finishes
  }, [dispatch, navigate]);

  if (loading) {
    // show a loader while checking authentication
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/feed"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-blog"
        element={
          <PrivateRoute>
            <MyBlog />
          </PrivateRoute>
        }
      />
      <Route
        path="/update/:id"
        element={
          <PrivateRoute>
            <UpdateBlog />
          </PrivateRoute>
        }
      />
    </Routes>
    
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
