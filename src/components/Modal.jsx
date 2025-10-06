import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Modal = ({ recipe }) => {
  const [likes, setLikes] = useState({});

  const toggleLike = (id) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id],
    }));
  };

  const [savedRecipes, setSavedRecipes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedRecipes") || "[]");
    } catch {
      return [];
    }
  });

  // ensure this recipe has a likes key
  useEffect(() => {
    if (!recipe?.id) return;
    setLikes((prev) =>
      prev[recipe.id] === undefined ? { ...prev, [recipe.id]: false } : prev
    );
  }, [recipe]);

  const notifySave = () => toast.success("Recipe Saved! in My Recipes");

  const notifyExist = () => toast.warning("Recipe Already Saved");

  const handleSave = (r) => {
    if (!r) {
      return;
    }
    setSavedRecipes((prev) => {
      if (prev.some((item) => item.id === r.id)) {
        notifyExist();
        return prev;
      }
      const next = [...prev, r];
      try {
        localStorage.setItem("savedRecipes", JSON.stringify(next));
      } catch {}
      // notify other parts of app if needed
      window.dispatchEvent(new Event("savedRecipesUpdated"));
      notifySave();
      return next;
    });
  };

  // share to WhatsApp
  const shareToWhatsapp = (dishName, link) => {
    const text = `${dishName} - Check out this recipe: ${link}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // safety: don't render if no recipe prop
  if (!recipe) {
    return null;
  }

  return (
    <>
      {/* Full-width Image */}
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.dishName}
          className="img-fluid w-100"
          style={{ maxHeight: "340px", objectFit: "cover" }}
        />
      )}
      {/* Modal Body (Full width, no card box) */}
      <div className="modal-body px-4 py-3">
        <p>
          <strong>Description:</strong>{" "}
          {recipe.description || "No description provided."}
        </p>
        <p>
          <strong>Ingredients:</strong>{" "}
          {Array.isArray(recipe.Ingredients) && recipe.Ingredients.length > 0
            ? recipe.Ingredients.join(", ")
            : "Not specified."}
        </p>
        <p>
          <strong>Tags:</strong>{" "}
          {Array.isArray(recipe.tags) && recipe.tags.length > 0
            ? recipe.tags.map((tag, i) => (
                <span key={i} className="badge bg-success text-light me-2 mb-2">
                  #{tag}
                </span>
              ))
            : "No tags."}
        </p>
        <p>
          <strong>Steps:</strong> {recipe.Steps || "Steps not mentioned."}
        </p>

        {recipe.link && (
          <p>
            <strong>Link:</strong>{" "}
            <a href={recipe.link} target="_blank" rel="noreferrer">
              {recipe.link}
            </a>
          </p>
        )}
      </div>
      {/* Footer */}
      <div className="modal-footer bg-light border-0 px-4">
        <button
          type="button"
          className="btn btn-outline-danger btn-sm me-2"
          onClick={() => toggleLike(recipe.id)}
        >
          {likes[recipe.id] ? "❤️ Liked" : "🤍 Like"}
        </button>

        <button
          type="button"
          className="btn btn-outline-primary btn-sm me-2"
          onClick={() => handleSave(recipe)}
        >
          💾 Save
        </button>

        <button
          type="button"
          className="btn btn-outline-success btn-sm"
          onClick={() => shareToWhatsapp(recipe.dishName, recipe.link)}
        >
          ➤ Share
        </button>
      </div>
    </>
  );
};

export default Modal;
