import "./error.css";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <h1>404 Error Page </h1>
      <p className="zoom-area">
        <b>Sorry!</b> Something went wrong.
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div class="link-container">
        <Link to="/" className="more-link">
          Home
        </Link>
      </div>
    </>
  );
};

export default Error;
