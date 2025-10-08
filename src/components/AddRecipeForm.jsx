import { useState } from "react";
import { toast } from "react-toastify";
import formbg from "../assets/bg.png";

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
    <div
      className="min-vh-100 d-flex align-items-center justify-content-end"
      style={{
        backgroundImage: `url(${formbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="d-flex justify-content-end pe-5 w-100">
        <div className="col-lg-6 col-md-8 col-sm-10 bg-warning bg-opacity-50 rounded-5 shadow p-4">
          <h2 className="text-center mb-4 fw-bold text-dark">Upload Recipe</h2>

          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <input
                  type="text"
                  placeholder="Recipe Title"
                  value={dishName}
                  onChange={(e) => setDishName(e.target.value)}
                  required
                  className="form-control bg-transparent border-secondary"
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Ingredients (comma separated)"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  required
                  className="form-control bg-transparent border-secondary"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="form-control bg-transparent border-secondary"
                  rows="3"
                />
              </div>
              <div className="col-md-6">
                <textarea
                  placeholder="Steps"
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  required
                  className="form-control bg-transparent border-secondary"
                  rows="3"
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label fw-semibold">
                  Select tag for your Recipe
                </label>
                <select
                  id="selecttag"
                  multiple
                  value={tags}
                  onChange={handleTagChange}
                  className="form-select bg-transparent border-secondary"
                >
                  <option value="Spicy">Spicy</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Healthy">Healthy</option>
                </select>
                <small className="text-muted">
                  (Hold Ctrl to select multiple)
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Upload Image</label>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="form-control bg-transparent border-secondary"
                  onChange={handleImageChange}
                />
                <small className="text-muted">
                  Allowed: JPG, PNG, WebP (Max 1MB)
                </small>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <input
                  type="url"
                  className="form-control bg-transparent border-secondary"
                  id="recipeLink"
                  placeholder="Enter recipe URL"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>

            <div className="text-center mt-3">
              <button
                className="btn btn-warning w-100 fw-semibold rounded-5 fs-5 border-0"
                type="submit"
              >
                Submit Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
