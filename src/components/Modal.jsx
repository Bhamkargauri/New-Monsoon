// const Modal = ({ recipe }) => {
//   const [likes, setLikes] = useState({});
//   const [savedRecipes, setSavedRecipes] = useState([]);

//   useEffect(() => {
//     if (recipe?.id) {
//       setLikes((prev) => ({
//         ...prev,
//         [recipe.id]: prev[recipe.id] || false,
//       }));
//     }
//     const saved = JSON.parse(localStorage.getItem("savedRecipes")) || [];
//     setSavedRecipes(saved);
//   }, [recipe]);

//   const handleSave = (recipe) => {
//     const updated = [...savedRecipes, recipe];
//     setSavedRecipes(updated);
//     localStorage.setItem("savedRecipes", JSON.stringify(updated));
//     window.dispatchEvent(new Event("savedRecipesUpdated"));
//   };

//   function shareToWhatsapp(dishName, link) {
//     const text = `${dishName} - Check out this recipe: ${link}`;
//     const encodedText = encodeURIComponent(text); // Encode text for URL
//     const url = `https://wa.me/?text=${encodedText}`;
//     window.open(url, "_blank"); // Opens in a new tab
//   }

//   const toggleLike = (id) => {
//     setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <div className="modal-md modal-dialog modal-dialog-scrollable">
//       <div>
//         <div className="modal-header">
//           <h5 className="modal-title fw-bold fs-2">{recipe.dishName}</h5>
//         </div>
//         {/* Modal Image */}
//         {recipe.image && (
//           <img
//             src={recipe.image}
//             style={{ height: "300px", width: "100%", objectFit: "cover" }}
//             alt={recipe.dishName}
//           />
//         )}

//         {/* Modal Body */}
//         <div className="modal-body">
//           <p>
//             <span className="fw-semibold">Ingredients: </span>
//             {recipe.Ingredients.join(", ")}
//           </p>
//           <p>
//             <span className="fw-semibold">Tags: </span>
//             {recipe.tags.join(", ")}
//           </p>
//           <p>
//             <span className="fw-semibold">Description: </span>
//             {recipe.description}
//           </p>
//           <p>
//             <span className="fw-semibold">Link: </span>
//             <a href={recipe.link} target="_blank" rel="noreferrer">
//               {recipe.link}
//             </a>
//           </p>
//         </div>

//         {/* Footer Actions */}
//         <div className="modal-footer justify-content-start">
//           <button
//             className="btn btn-light border-0"
//             onClick={toggleLike(recipe.id)}
//             type="button"
//             style={{ cursor: "pointer" }}
//           >
//             {likes[recipe.id] ? (
//               <span className="fs-2">❤️</span>
//             ) : (
//               <span className="fs-2">🤍</span>
//             )}
//           </button>
//           <button
//             className="btn btn-light border-0 fs-4"
//             onClick={() => handleSave(recipe)}
//             style={{ cursor: "pointer" }}
//           >
//             💾
//           </button>
//           <button
//             className="btn btn-light border-0 fs-4"
//             onClick={() => shareToWhatsapp(recipe.dishName, recipe.link)}
//             style={{ cursor: "pointer" }}
//           >
//             ➤
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

import { useEffect, useState } from "react";

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

  const handleSave = (r) => {
    if (!r) {
      return;
    }
    setSavedRecipes((prev) => {
      alert("Recipe Save in My Recipes");
      if (prev.some((item) => item.id === r.id)) return prev;
      const next = [...prev, r];
      try {
        localStorage.setItem("savedRecipes", JSON.stringify(next));
      } catch {}
      // notify other parts of app if needed
      window.dispatchEvent(new Event("savedRecipesUpdated"));
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
    <div className="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
      <div
        className="modal-content"
        style={{ borderRadius: 16, overflow: "hidden" }}
      >
        <div className="modal-header">
          <h5 className="modal-title fw-bold fs-4">{recipe.dishName}</h5>
        </div>

        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.dishName}
            style={{ width: "100%", height: 300, objectFit: "cover" }}
          />
        )}

        <div className="modal-body">
          <p>
            <strong>Description:</strong>{" "}
            {recipe.description || "No description"}
          </p>
          <p>
            <strong>Ingredients:</strong>{" "}
            {Array.isArray(recipe.Ingredients) && recipe.Ingredients.length > 0
              ? recipe.Ingredients.join(", ")
              : "Not specified"}
          </p>

          <p>
            <strong>Tags:</strong>{" "}
            {Array.isArray(recipe.tags) && recipe.tags.length > 0
              ? recipe.tags.join(", ")
              : "No tags"}
          </p>

          <p>
            <strong>Steps:</strong> {recipe.Steps || "Steps not mentioned"}
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

        <div className="modal-footer justify-content-start">
          <button
            type="button"
            className="btn btn-light border-0"
            style={{ cursor: "pointer" }}
            onClick={()=>toggleLike(recipe.id)}
          >
            {likes[recipe.id] ? (
              <span className="fs-4">❤️</span>
            ) : (
              <span className="fs-4">🤍</span>
            )}
          </button>

          <button
            type="button"
            title="click to save recipe in My Recipe"
            className="btn btn-light border-0 fs-5"
            onClick={() => handleSave(recipe)}
            style={{ cursor: "pointer" }}
          >
            💾
          </button>

          <button
            type="button"
            className="btn btn-light border-0 fs-5"
            title="Share Recipes on Whatsapp"
            onClick={() => shareToWhatsapp(recipe.dishName, recipe.link)}
            style={{ cursor: "pointer" }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
