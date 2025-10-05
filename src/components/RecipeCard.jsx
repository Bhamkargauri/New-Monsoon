import { useEffect, useState } from "react";
import recipesData from "../api/api.json";
import "../App.css";

import Carousel from "./Carousel";
import Modal from "./Modal";

const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [likes, setLikes] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipesData);
    setDisplayedRecipes(recipesData);
    const likesInit = recipesData.reduce((acc, r) => {
      acc[r.id] = false;
      return acc;
    }, {});
    setLikes(likesInit);
    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || []; //added
    setSavedRecipes(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchText.trim() === "") {
      setDisplayedRecipes(recipes);
      return;
    }

    const filtered = recipes.filter(
      (r) =>
        String(r.dishName || "")
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        r.tags.some((tag) =>
          tag.toLowerCase().includes(searchText.toLowerCase())
        )
    );
    setDisplayedRecipes(filtered);
  };

  const handleDropdownChange = (value) => {
    setSearchText(value);

    if (!value) {
      // Show all recipes when "All" is selected
      setDisplayedRecipes(recipesData);
    } else {
      // Filter recipes based on selected tag
      const filtered = recipesData.filter((r) =>
        r.tags.some((tag) => tag.toLowerCase() === value.toLowerCase())
      );
      setDisplayedRecipes(filtered);
    }
  };

  const handleSearchInput = () => {
    if (!searchInput.trim()) {
      setDisplayedRecipes(recipes); // show all if input empty
      return;
    }
    const filtered = recipesData.filter((r) =>
      r.dishName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setDisplayedRecipes(filtered);
  };

  return (
    <div className="align-items-center justify-content-around d-flex flex-column">
      <Carousel />
      <form className="w-100 mt-5" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center w-100  mb-3 flex-wrap mx-5">
          <div
            className="d-flex align-items-center justify-content-between border"
            style={{ width: "230px" }}
          >
            <h5 className="mt-2">Filter by Tag</h5>
            <select
              className="form-select border border-bg-warning fs-5 "
              style={{ width: "150px" }}
              value={searchText}
              onChange={(e) => handleDropdownChange(e.target.value)}
            >
              <option value="">All</option>
              <option value="Beverage">Beverages</option>
              <option value="Spicy">Spicy</option>
              <option value="Snacks">Snacks</option>
              <option value="Healthy">Healthy</option>
            </select>
          </div>

          {/* Search + Button */}
          <div
            className="d-flex gap-2 mt-2"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <input
              type="text"
              placeholder="Search by dish name"
              className="form-control border border-warning rounded-5 text-center w-50"
              value={searchInput}
              // onChange={(e) => setSearchInput(e.target.value)}
              onChange={(e) => {
                let val = e.target.value;
                setSearchInput(val);
                if (val === "") {
                  setDisplayedRecipes(recipes);
                }
              }}
            />
            <button
              type="button"
              className="btn btn-primary bg-warning border-0 rounded-5 fs-4 fw-semibold "
              onClick={handleSearchInput}
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {/* Cards */}

      <h2>Tasty MonSoon Recepies 😋</h2>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 w-100 px-5 pb-5">
        {displayedRecipes.map((recipe) => (
          <div className="col " key={recipe.id}>
            <div
              className="card h-100 custom-card shadow-lg  border-2 border-warning"
              style={{
                borderRadius: "35px",
                hover: { transform: "scale(1.05)" },
              }}
            >
              {recipe.image && (
                <img
                  src={recipe.image}
                  className="card-img-top rounded-top-5"
                  alt={recipe.dishName}
                  style={{ height: "200px", objectFit: "cover" }}
                />
              )}
              <div>
                <div className="card-body box">
                  <h5 className="card-title fw-bold fs-5">{recipe.dishName}</h5>
                  <p className="card-text" style={{ fontSize: "14px" }}>
                    <span className="fw-semibold">Description:</span>
                    {recipe.description}{" "}
                    <a
                      className="link-offset-1"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedRecipe(recipe);
                      }}
                    >
                      View Recipe
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content p-3">
              <button
                className="btn-close ms-auto"
                onClick={() => setSelectedRecipe(null)}
              ></button>
              <Modal recipe={selectedRecipe} likes={likes} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
