import axios from "axios";
import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AddRecipeForm() {
  const [dishName, setDishName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [link, setLink] = useState("");

  const apiUrl = "https://6880ec34f1dcae717b63fc74.mockapi.io/MyRecipies";

  const notifySuccess = () => toast.success("Recipe added successfully!");

  const notifyError = () => toast.error("Failed to add Recipe!");

  const notifyWarning = () =>
    toast.warning("Please select a valid image file.");

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

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  const handleImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // setSelectedFile(file);
      if (!allowedTypes.includes(file.type)) {
        notifyWarning("Only JPG, PNG, or WebP images are allowed.");
        return;
      }

      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setSelectedFile(compressedFile);
        const reader = new FileReader();
        reader.onload = (e) => setImage(e.target.result);
        reader.readAsDataURL(compressedFile);
      } catch (err) {
        console.error("Image compression failed:", err);
        notifyWarning("Failed to process image.");
      }
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
      notifySuccess();
    } catch (err) {
      console.error(err);
      notifyError();
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("dishName", dishName);
  //   formData.append(
  //     "Ingredients",
  //     ingredients.split(",").map((i) => i.trim())
  //   );
  //   formData.append("description", description);
  //   formData.append("Steps", steps);
  //   formData.append("tags", tags);
  //   formData.append("image", selectedFile); // original File object, not base64
  //   formData.append("link", link);
  //   try {
  //     await axios.post(apiUrl, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     fetchRecipes();
  //     setDishName("");
  //     setIngredients("");
  //     setDescription("");
  //     setSteps("");
  //     setTags([]);
  //     setImage("");
  //     setLink("");
  //     notifySuccess();
  //   } catch (err) {
  //     console.error(err);
  //     notifyError();
  //   }
  // };

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
          accept=".jpg,.jpeg,.png,.webp"
          className="form-control mb-2"
          onChange={handleImageChange}
        />
        <small className="text-muted">
          Allowed file types: JPG, PNG, WebP.
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
