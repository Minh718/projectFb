import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useGlobalContext } from "./context/context";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Error from "./pages/error.js/Error";
export default function App() {
  const { user } = useGlobalContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}
