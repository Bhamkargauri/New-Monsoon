import { useEffect, useState } from "react";
import Modal from "./Modal";

const MyRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [uploadedRecipes, setUploadedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // API for uploaded recipes
  const apiUrl = "https://6880ec34f1dcae717b63fc74.mockapi.io/MyRecipies";

  // Load recipes from localStorage
  const loadRecipes = () => {
    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setSavedRecipes(saved);
  };

  // Remove recipe from saved (localStorage)
  const handleRemove = (id, dishName) => {
    const updated = savedRecipes.filter(
      (r) => r.id !== id && r.dishName !== dishName
    );
    setSavedRecipes(updated);
    localStorage.setItem("savedRecipes", JSON.stringify(updated));
    window.dispatchEvent(new Event("savedRecipesUpdated"));
  };

  // Fetch uploaded recipes from API
  const fetchUploadedRecipes = async () => {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setUploadedRecipes(data);
    } catch (err) {
      console.error("Error fetching uploaded recipes:", err);
    }
  };

  // Delete recipe from API
  const handleDeleteUploaded = async (id) => {
    if (window.confirm("Delete this recipe?")) {
      try {
        await fetch($`{apiUrl}` / $`{id}`, { method: "DELETE" });
        fetchUploadedRecipes(); // refresh after delete
      } catch (err) {
        console.error("Error deleting recipe:", err);
      }
    }
  };

  // Initial load
  useEffect(() => {
    loadRecipes();
    window.addEventListener("savedRecipesUpdated", loadRecipes);

    fetchUploadedRecipes();

    return () => window.removeEventListener("savedRecipesUpdated", loadRecipes);
  }, []);

  return (
    <div className="container my-4">
      {/* Saved Recipes Section */}
      <h1 className="mb-4 text-center">SAVED RECIPES</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 w-100 px-3 pb-5">
        {savedRecipes.length === 0 ? (
          <p className="text-muted">No recipes saved yet.</p>
        ) : (
          savedRecipes.map((recipe, index) => (
            <div className="col" key={index}>
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
                <div className="card-body">
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

                <div className="card-footer d-flex justify-content-end">
                  <button
                    className="btn btn-danger btn-sm px-2 py-1"
                    style={{ fontSize: "0.75rem" }}
                    onClick={() => handleDeleteUploaded(recipe.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Uploaded Recipes Section */}
      <h1 className="mt-5 mb-4 text-center">UPLOADED RECIPES</h1>
      <div className="row row-cols-1 row-cols-md-4 g-4 mt-4 w-100 px-3 pb-5">
        {uploadedRecipes.length === 0 ? (
          <p className="text-muted">No recipes uploaded yet.</p>
        ) : (
          uploadedRecipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <div
                className="card h-100 custom-card shadow-lg  border-2 border-warning"
                style={{
                  borderRadius: "35px",
                  hover: { transform: "scale(1.05)" },
                }}
              >
                {/* Image */}
                {recipe.image && (
                  <img
                    src={recipe.image}
                    className="card-img-top rounded-top-5"
                    alt={recipe.dishName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body box">
                  <h5 className="card-title fw-bold fs-5">{recipe.dishName}</h5>
                  {/* <p className="card-text">{recipe.description}</p> */}
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

                {/* Footer with Delete */}
                <div className="card-footer d-flex justify-content-end">
                  <button
                    className="btn btn-danger btn-sm px-1 py-1"
                    style={{ fontSize: "0.75rem" }}
                    onClick={() => handleDeleteUploaded(recipe.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedRecipe && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div
            className="modal-dialog"
            style={{
              maxWidth: "700px",
              width: "50%",
            }}
          >
            <div className="modal-content p-3">
              <button
                className="btn-close ms-auto"
                onClick={() => setSelectedRecipe(null)}
              ></button>
              <Modal recipe={selectedRecipe} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;
