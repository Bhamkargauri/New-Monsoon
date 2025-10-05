import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const Collapse = () => {
    const nav = document.getElementById("nav");
    if (nav && nav.classList.contains("show")) {
      nav.classList.remove("show");
    }
  };
  return (
    <>
      <div
        className="navbar navbar-expand-lg navbar-dark bg-warning sticky-top"
        style={{
          height: "80px",
        }}
      >
        <div className="container">
          <Link className="navbar-brand fw-bold fs-3 text-shadow-lg" to="/">
            ☔ Monsoon Recipe Hub
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse  " id="nav">
            <ul className="navbar-nav ms-auto fs-5 fw-semibold bg-warning bg-opacity-75 rounded-4 p-2 ">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/" onClick={Collapse}>
                  Home🏠
                </Link>
              </li>
              <li className="nav-item ">
                <button
                  className="nav-link text-white "
                  data-bs-toggle="collapse"
                  data-bs-target="#nav"
                  onClick={() => {
                    navigate("/add-recipe"); // first navigate
                    Collapse(); // then collapse
                  }}
                >
                  Upload Recipe⬆️
                </button>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  to="/my-recipes"
                  onClick={Collapse}
                >
                  My Recipes
                </Link>
              </li>
              <li className="nav-item ">
                <button
                  className="btn btn-link nav-link text-white"
                  onClick={() => {
                    navigate("/login"); // first navigate
                    Collapse(); // then collapse
                  }}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
