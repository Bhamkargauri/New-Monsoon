import { useEffect, useState } from "react";
import recipesData from "../api/api.json";
import "../App.css";
import Banner1 from "../assets/Banner.png";
import Chai from "../assets/Chai.jpg";
import Banner3 from "../assets/VadaPav.png";
import Modal from "./Modal";

const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([]); // added

  useEffect(() => {
    setRecipes(recipesData);
    setDisplayedRecipes(recipesData);
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
  //  save recepie to local storage
  const handleSave = (recipe) => {
    //added
    const updated = [...savedRecipes, recipe]; //added
    setSavedRecipes(updated); // added
    localStorage.setItem("savedRecipes", JSON.stringify(updated)); //added
    window.dispatchEvent(new Event("savedRecipesUpdated")); // added
  }; // added

  function shareToWhatsapp(dishName, link) {
    const text = `${dishName} - Check out this recipe: ${link}`;
    const encodedText = encodeURIComponent(text); // Encode text for URL
    const url = `https://wa.me/?text=${encodedText}`;
    window.open(url, "_blank"); // Opens in a new tab
  }

  return (
    <div className="align-items-center justify-content-around d-flex flex-column">
      <div className="container-fluid p-0 border border-warning rounded-bottom ">
        <div
          id="heroCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {/* Slide 1 */}
            <div className="carousel-item active m-0 p-0">
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)), url(${Banner1})`,
                  height: "400px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                  <h1 className="fs-1 fw-bold text-white">
                    Warm Recipes for Rainy Days
                  </h1>
                  <p className="text-white">
                    Browse & share your favorite monsoon treats
                  </p>
                  {/* <button className="btn btn-light btn-lg mt-2">
                    Explore Recipes
                  </button> */}
                </div>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="carousel-item">
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)), url(${Chai})`,
                  height: "400px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                  <h1 className="fs-1 fw-bold text-white">
                    Hot Soups & Snacks
                  </h1>
                  <p className="text-white">
                    Perfect comfort food for monsoon season
                  </p>
                  {/* <button className="btn btn-light btn-lg mt-2">Try Now</button> */}
                </div>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="carousel-item">
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)), url(${Banner3})`,
                  height: "400px",
                  width: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                  <h1 className="fs-1 fw-bold text-white">Seasonal Treats</h1>
                  <p className="text-white">
                    Enjoy flavors of the rainy season
                  </p>
                  {/* <button className="btn btn-light btn-lg mt-2">
                    Get Recipes
                  </button> */}
                </div>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <form className="w-100 mt-5" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-center w-100  mb-3 flex-wrap mx-5">
          <div>
            <div
              className="d-flex align-items-center justify-content-between border"
              style={{ width: "230px" }}
            >
              <h5 className="mt-2">Filter by Tag</h5>
              <select
                className="form-select border border-bg-warning fs-5 "
                style={{ maxWidth: "100px" }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              >
                <option value="">All</option>
                <option value="Beverage">Beverages</option>
                <option value="Spicy">Spicy</option>
                <option value="Snacks">Snacks</option>
                <option value="Healthy">Healthy</option>
              </select>
            </div>
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
              value={searchText}
              onChange={(e) => setSearchText(e.target.value.toLowerCase())}
            />
            <button
              type="submit"
              className="btn btn-primary bg-warning border-0 rounded-5 fs-4 fw-semibold "
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
                onClick={() => setSelectedRecipe(null)} // ✅ close modal
              ></button>
              <Modal
                recipe={selectedRecipe}
                handleSave={handleSave}
                shareToWhatsapp={shareToWhatsapp}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
