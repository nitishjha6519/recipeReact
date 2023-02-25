import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const navigate = useNavigate();
  let [data, setData] = useState({
    title: "",
    author: "",
    url: "",
    ingredients: "",
    directions: "",
  });

  function handleChange(e) {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  }

  function validation(data) {
    let flag = false;

    if (
      data.title !== "" &&
      data.author !== "" &&
      data.url !== "" &&
      data.ingredients !== "" &&
      data.directions !== ""
    ) {
      flag = true;
    }

    return flag;
  }

  function handleSubmit(e) {
    e.preventDefault();

    let flag = validation(data);

    if (flag === false) {
      alert("details cannot be empty ");
    } else {
      let URL = "https://recipeapi-97jh.onrender.com/users/addrecipe";
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
            alert(`${dt.message}`);
            navigate("/landingpage");
          } else {
            alert(`${dt.message}`);
          }
        });
    }
  }

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center">
      <p
        className="p-2 text-white border border-white absolute top-6 left-20"
        onClick={() => navigate("/landingpage")}
      >
        Back
      </p>
      <div className="w-96">
        <h1 className="text-3xl text-white mb-6">Create a Recipe</h1>
        <form className="w-full" onSubmit={handleSubmit}>
          <label htmlFor="title" className=" text-white text-sm">
            Recipe Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 rounded mb-2"
            onChange={handleChange}
          />

          <label htmlFor="author" className=" text-white text-sm">
            Author
          </label>
          <input
            type="text"
            id="author"
            className="w-full p-2 rounded mb-2"
            onChange={handleChange}
          />

          <label htmlFor="url" className=" text-white text-sm">
            Image URL
          </label>
          <input
            type="url"
            id="url"
            className="w-full p-2 rounded mb-2"
            onChange={handleChange}
          />

          <label htmlFor="ingredients" className=" text-white text-sm">
            Ingredients
          </label>
          <textarea
            type="text"
            id="ingredients"
            rows={2}
            className="w-full p-2 rounded mb-2"
            onChange={handleChange}
          />

          <label htmlFor="directions" className=" text-white text-sm">
            Directions
          </label>
          <textarea
            type="text"
            id="directions"
            rows={2}
            className="w-full p-2 rounded mb-2"
            onChange={handleChange}
          />

          <button className="w-20 text-white border rounded border-white p-2  ml-36 hover:bg-slate-100 hover:text-black">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
