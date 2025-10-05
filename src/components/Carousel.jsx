import Banner1 from "../assets/Banner.png";
import Chai from "../assets/Chai.jpg";
import Banner3 from "../assets/VadaPav.png";
const Carousel = () => {
  return (
    <div className="container-fluid p-0 border border-warning rounded-bottom ">
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active m-0 p-0">
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)), url(${Banner1})`,
                height: "400px",
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                <h1 className="fs-1 fw-bold text-white">
                  Warm Recipes for Rainy Days
                </h1>
                <p className="text-white">
                  Browse & share your favorite monsoon treats
                </p>
                {/* <button className="btn btn-light btn-lg mt-2">
                    Explore Recipes
                  </button> */}
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)), url(${Chai})`,
                height: "400px",
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                <h1 className="fs-1 fw-bold text-white">Hot Soups & Snacks</h1>
                <p className="text-white">
                  Perfect comfort food for monsoon season
                </p>
                {/* <button className="btn btn-light btn-lg mt-2">Try Now</button> */}
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <div
              style={{
                backgroundImage: `linear-gradient(rgba(50, 50, 50, 0.6), rgba(50, 50, 50, 0.6)), url(${Banner3})`,
                height: "400px",
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="d-flex flex-column justify-content-center align-items-center text-center h-100">
                <h1 className="fs-1 fw-bold text-white">Seasonal Treats</h1>
                <p className="text-white">Enjoy flavors of the rainy season</p>
                {/* <button className="btn btn-light btn-lg mt-2">
                    Get Recipes
                  </button> */}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};
export default Carousel;
