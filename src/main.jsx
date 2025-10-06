import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import AddRecipeForm from "./components/AddRecipeForm.jsx";
import Login from "./components/Login.jsx";
import MyRecipes from "./components/MyRecipes.jsx";
import RecipeCard from "./components/RecipeCard.jsx";
import Register from "./components/Register.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <RecipeCard />,
      },
      {
        path: "/add-recipe",
        element: <AddRecipeForm />,
      },
      {
        path: "/my-recipes",
        element: <MyRecipes />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <RouterProvider router={appRouter} />
  // </StrictMode>
);
