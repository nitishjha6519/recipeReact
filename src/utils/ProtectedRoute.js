import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isLogged, setLogged] = useState(false);

  let token = window.localStorage.getItem("token");
  console.log(token);

  const navigate = useNavigate();
  useEffect(() => {
    if (token !== "") {
      setLogged(true);
    } else {
      if (token === null || token === "") navigate("/");
    }
  }, []);

  return <div>{isLogged ? children : null}</div>;
};

export default ProtectedRoute;
