import React, { useState, useRef } from "react";
import axios from "axios";
import Register from "../register/Register";
import "./login.css";
import { CircularProgress } from "@mui/material";
import { useGlobalContext } from "../../context/context";
export default function Login() {
  const [isFetch, setIsFetch] = useState(false);
  const [showRegister, setShowResigter] = useState(false);
  const { setUser } = useGlobalContext();
  const username = useRef();
  const password = useRef();
  const handSubmitLogin = async (e) => {
    e.preventDefault();
    setIsFetch(true);
    try {
      const res = await axios.post("/auth/login", {
        username: username.current.value,
        password: password.current.value,
      });
      setUser(res.data);
      // setIsFetch(false);
    } catch (err) {
      setIsFetch(false);
      console.log(err);
    }
  };
  return (
    <>
      <div className="loginRegister">
        <div className="containerFormLoginRegister">
          <div className="loginRegisterLeft">
            <h1>Lamasocial</h1>
            <p>Connect with friends and the world around you on Lamasocial.</p>
          </div>
          <div className="loginRegisterRight">
            <form className="formLoginRegister" onSubmit={handSubmitLogin}>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                ref={username}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                ref={password}
              />
              <button
                type="submit"
                className="btnLoginRegister"
                disabled={isFetch}
              >
                {isFetch ? (
                  <CircularProgress color="inherit" size="20px" />
                ) : (
                  "Login"
                )}
              </button>
              <p className="forgotPassword">Forgot Password</p>
              {/* <Link to="/register" className="LinktoLoginRegister"> */}
              <button
                type="button"
                className="btntoLoginRegister"
                onClick={() => {
                  setShowResigter(true);
                }}
                disabled={isFetch}
              >
                Create a new account
              </button>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
      {showRegister && <Register setShowResigter={setShowResigter} />}
    </>
  );
}
