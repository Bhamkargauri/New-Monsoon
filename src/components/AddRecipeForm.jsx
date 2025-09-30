import axios from "axios";
import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";

export default function AddRecipeForm() {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [link, setLink] = useState("");

  const apiUrl = "https://6880ec34f1dcae717b63fc74.mockapi.io/MyRecipies";

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(apiUrl);
      setRecipes(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(compressedFile);
    }
  };

  const handleTagChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (o) => o.value);
    setTags(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      dishName,
      Ingredients: ingredients.split(",").map((i) => i.trim()),
      description,
      Steps: steps,
      tags,
      image,
      link,
    };

    try {
      await axios.post(apiUrl, newRecipe);
      fetchRecipes();

      setDishName("");
      setIngredients("");
      setDescription("");
      setSteps("");
      setTags([]);
      setImage("");
      setLink("");

      alert("Recipe added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add recipe!");
    }
  };

  return (
    <div className="w-50 mx-auto p-3">
      <h2 className="text-center mb-3 fw-bold">Upload Recipe📜</h2>
      <form onSubmit={handleSubmit}>
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
        <label className="form-label">Select tag for your Recepie</label>
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
          <option>Heallthy</option>
        </select>
        <input
          type="file"
          className="form-control mb-2"
          onChange={handleImageChange}
        />

        <input
          type="url"
          className="form-control"
          id="recipeLink"
          placeholder="Enter recipe URL"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-primary w-full bg- border-0 rounded-5 fw-semibold fs-5 h-auto "
            type="submit"
          >
            Submit Recipe
          </button>
        </div>
      </form>
    </div>
  );
}
