import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import recipes from "../data";
import "./landingPage";

const LandingPage = () => {
  let [search, setSearch] = useState("");
  let [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  function handleClick() {
    window.localStorage.clear();
    // let token = window.localStorage.getItem("token");
    navigate("/");
  }

  useEffect(() => {
    let URL = "https://recipeapi-97jh.onrender.com/users/recipe";
    let Options = {
      method: "GET",
      // headers: {
      //   "Authorization": "token",
      // },
      // body: JSON.stringify(data),
    };
    fetch(URL)
      .then((res) => res.json())
      .then((dt) => {
        console.log(dt);
      });
  }, []);

  function handleFilter(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
    let filtData = recipes.filter((item) => {
      let searchTerm = search.toLowerCase();
      let title = item.title.toLowerCase();

      return searchTerm && title.includes(searchTerm);
    });
    if (search === "") {
      setFiltered([]);
    } else {
      setFiltered(filtData);
    }

    //   console.log({ filtered });
    console.log({ recipes });
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <h1 className="mb-8 py-4">Logo Recipe App</h1>
        <h1
          className="mb-8 py-1 px-6 float-right text-center mt-5 rounded hover:bg-slate-200"
          onClick={handleClick}
        >
          Logout
        </h1>
      </div>

      <input
        type="text"
        placeholder="Search Recipe"
        autoComplete="false"
        value={search}
        className=" rounded-md px-4 py-2 w-96 bg-gray-800 text-white m-auto block mb-8"
        onChange={handleFilter}
      />

      <div
        className="rounded-md px-4 py-2 w-16 bg-gray-800 text-white m-auto block"
        onClick={() => navigate("/createrecipe")}
      >
        New
      </div>

      <p className="mb-2">All Recipes</p>

      <div className="grid grid-cols-3 gap-4  mb-52">
        {filtered.length !== 0 &&
          filtered.map((item, i) => {
            return (
              <div className="w-full h-80  relative" key={i}>
                <img
                  src={item.image.url}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-85"
                  onClick={() =>
                    navigate("/detailsrecipe", {
                      state: {
                        directions: item.directions,
                        ingredients: item.ingredients,
                        image: item.image.url,
                        title: item.title,
                      },
                    })
                  }
                />

                <p className="absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 text-white text-xl font-bold">
                  {item.title}
                </p>
              </div>
            );
          })}

        {filtered.length === 0 &&
          recipes.map((item, i) => {
            return (
              <div className="w-full h-80  relative" key={i}>
                <img
                  src={item.image.url}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-85"
                  onClick={() =>
                    navigate("/detailsrecipe", {
                      state: {
                        directions: item.directions,
                        ingredients: item.ingredients,
                        image: item.image.url,
                        title: item.title,
                      },
                    })
                  }
                />

                <p className="absolute top-1/2 left-1/2  -translate-y-1/2 -translate-x-1/2 text-white text-xl font-bold">
                  {item.title}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default LandingPage;
