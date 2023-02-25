import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    let lowerCase = "";
    if (e.target.id === "email") {
      lowerCase = e.target.value.toLowerCase();
      setData({
        ...data,
        [e.target.id]: lowerCase,
      });
    } else {
      setData({
        ...data,
        [e.target.id]: e.target.value,
      });
    }
  }

  function validation(data) {
    let flag = false;

    if (data.email !== "" && data.password !== "") {
      flag = true;
    }

    return flag;
  }

  function handleSubmit(e) {
    e.preventDefault();

    console.log(data);
    let flag = validation(data);

    if (flag === false) {
      alert("details cannot be empty");
    } else {
      let URL = "https://recipeapi-97jh.onrender.com/users/login";
      let Options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      fetch(URL, Options)
        .then((res) => res.json())
        .then((dt) => {
          console.log(dt);
          if (dt.status === "success") {
            let token = dt.token;

            // document.cookie = `token=${token};path="/"`;

            window.localStorage.setItem("token", token);
            alert(`${dt.status}`);
            navigate("/landingpage");
          } else {
            alert(`${dt.message}`);
          }
        });
    }
  }

  return (
    <div className="h-screen w-full bg-blue-500 flex flex-col justify-center items-center">
      <div className="w-96 bg-white rounded-xl p-8">
        <h1 className="text-3xl text-center font-medium mb-6">Sign In</h1>

        <form className="w-full" onSubmit={handleSubmit}>
          <label htmlFor="email" className="w-full font-mono text-base">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
            onChange={handleChange}
          />

          <label htmlFor="password" className="w-full font-mono text-base">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            className="w-full border border-gray-300 px-2 py-1 rounded mb-4"
            onChange={handleChange}
          />

          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox" className="text-sm font-mono ml-1 ">
            Remember Me
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 p-2 rounded text-center text-white m-2"
          >
            Submit
          </button>

          <p className="text-xs float-right">
            Forgot <span className="text-blue-500">password?</span>
          </p>

          <p
            className="text-center m-4 pt-2"
            onClick={() => navigate("/signup")}
          >
            New User? <span className="text-red-500 font-medium">Register</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
