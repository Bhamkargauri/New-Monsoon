// import React, { useEffect, useState } from "react";

// const MyRecipes = () => {
//   const [savedRecipes, setSavedRecipes] = useState([]);

//   // Load recipes from localStorage
//   const loadRecipes = () => {
//     const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
//     setSavedRecipes(saved);
//   };

//   // Remove recipe
//   const handleRemove = (id, dishName) => {
//     const updated = savedRecipes.filter(
//       (r) => r.id !== id && r.dishName !== dishName
//     );
//     setSavedRecipes(updated);
//     localStorage.setItem("savedRecipes", JSON.stringify(updated));
//     window.dispatchEvent(new Event("savedRecipesUpdated")); 
//   };

//   // nitial load + listen for updates
//   useEffect(() => {
//     loadRecipes();
//     window.addEventListener("savedRecipesUpdated", loadRecipes);
//     return () => window.removeEventListener("savedRecipesUpdated", loadRecipes);
//   }, []);

//   return (
//     <div className="container my-4">
//       <h1 className="mb-4">SAVED RECIPES</h1>

//       <div className="row row-cols-1 row-cols-md-3 g-4">
//         {savedRecipes.length === 0 ? (
//           <p className="text-muted">No recipes saved yet.</p>
//         ) : (
//           savedRecipes.map((recipe, index) => (
//             <div className="col" key={index}>
//               <div className="card h-100 shadow border-warning">
//                 {recipe.image && (
//                   <img
//                     src={recipe.image}
//                     className="card-img-top"
//                     alt={recipe.dishName}
//                     style={{ height: "200px", objectFit: "cover" }}
//                   />
//                 )}
//                 <div className="card-body">
//                   <h5 className="card-title">{recipe.dishName}</h5>
//                   <p className="card-text">{recipe.description}</p>
//                   <p>Link: <a href={recipe.link} target="_blank" rel="noopener noreferrer">{recipe.link}</a></p>
//                 </div>
//                 <div className="card-footer d-flex justify-content-end">
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => handleRemove(recipe.id, recipe.dishName)}
//                   >
//                     ❌ Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyRecipes;

import React, { useEffect, useState } from "react";

const MyRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [uploadedRecipes, setUploadedRecipes] = useState([]); // API recipes

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
        await fetch($`{apiUrl}`/$`{id}`, { method: "DELETE" });
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

    return () =>
      window.removeEventListener("savedRecipesUpdated", loadRecipes);
  }, []);

  return (
    <div className="container my-4">
      {/* Saved Recipes Section */}
      <h1 className="mb-4">SAVED RECIPES</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {savedRecipes.length === 0 ? (
          <p className="text-muted">No recipes saved yet.</p>
        ) : (
          savedRecipes.map((recipe, index) => (
            <div className="col" key={index}>
              <div className="card h-100 shadow border-warning">
                {recipe.image && (
                  <img
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.dishName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{recipe.dishName}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <p>
                    Link:{" "}
                    <a
                      href={recipe.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {recipe.link}
                    </a>
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemove(recipe.id, recipe.dishName)}
                  >
                    ❌ Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Uploaded Recipes Section */}
      <h1 className="mt-5 mb-4">UPLOADED RECIPES</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {uploadedRecipes.length === 0 ? (
          <p className="text-muted">No recipes uploaded yet.</p>
        ) : (
          uploadedRecipes.map((recipe) => (
            <div className="col" key={recipe.id}>
              <div className="card h-100 shadow border-success">
                {/* Image */}
                {recipe.image && (
                  <img
                    src={recipe.image}
                    className="card-img-top"
                    alt={recipe.dishName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title fw-bold">{recipe.dishName}</h5>
                  <p className="card-text">{recipe.description}</p>

                  {/* Ingredients */}
                  {recipe.Ingredients && recipe.Ingredients.length > 0 && (
                    <p>
                      <strong>Ingredients:</strong>{" "}
                      {recipe.Ingredients.join(", ")}
                    </p>
                  )}

                  {/* Steps */}
                  {recipe.Steps && (
                    <p>
                      <strong>Steps:</strong> {recipe.Steps}
                    </p>
                  )}

                  {/* Tags */}
                  {recipe.tags && recipe.tags.length > 0 && (
                    <p>
                      <strong>Tags:</strong> {recipe.tags.join(", ")}
                    </p>
                  )}

                  {/* Link */}
                  {recipe.link && (
                    <p>
                      <strong>Link:</strong>{" "}
                      <a
                        href={recipe.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {recipe.link}
                      </a>
                    </p>
                  )}
                </div>

                {/* Footer with Delete */}
                <div className="card-footer d-flex justify-content-end">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteUploaded(recipe.id)}
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyRecipes;