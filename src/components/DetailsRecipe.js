import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./landingPage";

const DetailsRecipe = () => {
  let data = useLocation();
  const navigate = useNavigate();

  let [toggle, setToggle] = useState(true);

  return (
    <div className="container mx-auto">
      <h1
        className="mb-8 py-4 hover:text-gray-600"
        onClick={() => navigate("/landingpage")}
      >
        Logo Recipe App
      </h1>

      <div className="flex w-full">
        <div className="p-4  w-1/2">
          <h1 className="text-3xl font-medium mb-4">{data.state.title}</h1>
          <img
            src={data.state.image}
            alt={data.state.title}
            className="w-4/5 h-96 object-cover"
          />
        </div>

        <div className="p-4  w-1/2">
          <div
            className="w-full p-2 text-center border border-black mb-2 hover:bg-gray-100"
            style={
              toggle
                ? { backgroundColor: "black", color: "white" }
                : { backgroundColor: "white" }
            }
            onClick={() => setToggle(true)}
          >
            Instructions
          </div>
          <div
            className="w-full p-2 text-center border border-black mb-2 hover:bg-gray-100"
            style={
              toggle
                ? { backgroundColor: "white", color: "black" }
                : { backgroundColor: "black", color: "white" }
            }
            onClick={() => setToggle(false)}
          >
            Ingredients
          </div>

          {toggle ? (
            <p>{data.state.directions}</p>
          ) : (
            <ul>
              {data.state.ingredients.map((item) => {
                return <li>{item}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsRecipe;
