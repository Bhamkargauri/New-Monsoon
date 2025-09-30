import { useEffect, useState } from "react";
import recipesData from "../api/api.json";

const Modal = ({ recipe }) => {
  const [likes, setLikes] = useState({});
  const [savedRecipes, setSavedRecipes] = useState([]);
  useEffect(() => {
    const likesInit = recipesData.reduce((acc, r) => {
      acc[r.id] = false;
      return acc;
    }, {});
    setLikes(likesInit);

    const saved = JSON.parse(localStorage.getItem("savedRecipes")) || []; //added
    setSavedRecipes(saved); // ✅ added
  }, []);

  const toggleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  return (
    <div className="modal-md modal-dialog modal-dialog-scrollable">
      <div>
        <div class="modal-header">
          <h5 class="modal-title fw-bold fs-2">{recipe.dishName}</h5>
        </div>
        {/* Modal Image */}
        {recipe.image && (
          <img
            src={recipe.image}
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
            alt={recipe.dishName}
          />
        )}

        {/* Modal Body */}
        <div className="modal-body">
          <p>
            <span className="fw-semibold">Ingredients: </span>
            {recipe.Ingredients.join(", ")}
          </p>
          <p>
            <span className="fw-semibold">Tags: </span>
            {recipe.tags.join(", ")}
          </p>
          <p>
            <span className="fw-semibold">Description: </span>
            {recipe.description}
          </p>
          <p>
            <span className="fw-semibold">Link: </span>
            <a href={recipe.link} target="_blank" rel="noreferrer">
              {recipe.link}
            </a>
          </p>
        </div>

        {/* Footer Actions */}
        <div className="modal-footer justify-content-start">
          <button
            className="btn btn-light border-0"
            onClick={() => toggleLike(recipe.id)}
            type="button"
          >
            {likes[recipe.id] ? (
              <span className="fs-2">❤️</span>
            ) : (
              <span className="fs-2">🤍</span>
            )}
          </button>
          <button
            className="btn btn-light border-0 fs-4"
            onClick={() => handleSave(recipe)}
          >
            💾
          </button>
          <button
            className="btn btn-light border-0 fs-4"
            onClick={() => shareToWhatsapp(recipe.dishName, recipe.link)}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
