import React, { useState, useRef } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";
import "./register.css";
export default function Register({ setShowResigter }) {
  const username = useRef();
  const password = useRef();
  const firsname = useRef();
  const surname = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      fullname: `${firsname.current.value} ${surname.current.value}`,
      username: username.current.value,
      password: password.current.value,
    };
    try {
      const res = await axios.post("/auth/register", user);
      console.log(res);
      setShowResigter(false);
    } catch (err) {
      console.log("trùng username");
      console.log(err);
    }
  };
  console.log(123);
  return (
    <div className="main-register">
      <div className="container-form-register">
        <div className="header-register">
          <h2>Sign up</h2>
          <p>It's quick and easy.</p>
          <FaTimes
            className="icon-exit-register"
            onClick={() => {
              setShowResigter(false);
            }}
          />
        </div>
        <form className="formRegister" onSubmit={handleSubmit}>
          <div className="fullName">
            <input
              type="text"
              placeholder="First name"
              className="form-control1"
              ref={firsname}
            />
            <input
              type="text"
              placeholder="Surname"
              className="form-control1"
              ref={surname}
            />
          </div>
          <input
            type="text"
            placeholder="Username"
            className="form-control1"
            ref={username}
          />
          <input
            type="password"
            placeholder="Password"
            className="form-control1"
            ref={password}
          />
          <div className="container-gender">
            <span className="choose-gender">
              <label htmlFor="female">Female</label>
              <input type="radio" id="female" name="gender" value="female" />
            </span>
            <span className="choose-gender">
              <label htmlFor="male">Male</label>
              <input type="radio" id="male" name="gender" value="male" />
            </span>
            <span className="choose-gender">
              <label htmlFor="other">Other</label>
              <input type="radio" id="other" name="gender" value="other" />
            </span>
          </div>
          <button type="submit" className="btnSignUp">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
