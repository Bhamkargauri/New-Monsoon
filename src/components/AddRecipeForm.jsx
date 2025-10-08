import { useState } from "react";
import { toast } from "react-toastify";

export default function AddRecipeForm() {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  // const [recipes, setRecipes] = useState([]);
  // const [selectedFile, setSelectedFile] = useState(null);
  const [link, setLink] = useState("");

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setTags(selected);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.warning("Only JPG, PNG, and WebP images are allowed!");
      e.target.value = "";
      return;
    }

    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
      toast.warning("Image size must be less than 1MB!");
      e.target.value = "";
      return;
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (image) {
      // Convert image to Object URL (short path, not Base64)
      imageUrl = URL.createObjectURL(image);
    }
    const newRecipe = {
      dishName,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      description,
      steps,
      tags,
      image: imageUrl,
      link,
    };

    try {
      const res = await fetch(
        "https://6880ec34f1dcae717b63fc74.mockapi.io/MyRecipies",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newRecipe),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to submit recipe");
      }

      toast.success("Recipe added successfully!");
      // Reset form
      setDishName("");
      setIngredients("");
      setDescription("");
      setSteps("");
      setTags([]);
      setImage(null);
      setLink("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add Recipe!");
    }
  };

  return (
    <div className="w-50 mx-auto p-3">
      <h2 className="text-center mb-3 fw-bold">Upload Recipe📜</h2>
      <form onSubmit={handleSubmit} className="p-3">
        <input
          type="text"
          placeholder="Recipe Title"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="text"
          placeholder="Ingredients (comma separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          className="form-control mb-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control mb-2"
        />
        <textarea
          placeholder="Steps"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          required
          className="form-control mb-2"
        />
        <label className="form-label">Select tag for your Recipe</label>
        <select
          id="selecttag"
          multiple
          value={tags}
          onChange={handleTagChange}
          className="form-select mb-2"
        >
          <option>Spicy</option>
          <option>Beverages</option>
          <option>Snacks</option>
          <option>Healthy</option>
        </select>

        <input
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          className="form-control mb-2"
          onChange={handleImageChange}
        />
        <small className="text-muted">
          Allowed file types: JPG, PNG, WebP. Max size: 1MB.
        </small>

        <input
          type="url"
          className="form-control mt-2"
          id="recipeLink"
          placeholder="Enter recipe URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary w-full border-0 rounded-5 fw-semibold fs-5"
            type="submit"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
