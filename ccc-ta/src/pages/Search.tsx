import leftArrow from "../assets/icons/leftarrow.png";
import searchIcon from "../assets/icons/searchICon.png";
import { Link } from "react-router-dom";
import ResultCard from "../components/ResultCard";

function SearchPage() {
  return (
    <div id="search-main">
      <div id="search-page-topbar">
        <div style={{ display: "flex" }}>
          <img src={leftArrow} style={{ width: "25px" }} />
          <p style={{ marginTop: "3px" }}>Return</p>
        </div>
      </div>

      <div id="search-bar-wrapper" style={{ marginTop: "20px" }}>
        <input
          id="landing-page-input"
          className="search-bar"
          placeholder="Enter name..."
        ></input>
        <div
          className="search-button-div"
          style={{ paddingTop: "10px", paddingBottom: "10px" }}
        >
          <Link to="/search">
            <img src={searchIcon} style={{ width: "30px", height: "auto" }} />
          </Link>
        </div>
      </div>

      <div id="results-container">
        <h1
          style={{
            color: "black",
            fontSize: 22.5,
            marginTop: "75px",
          }}
        >
          Recent Results
        </h1>
        <ResultCard />
      </div>

      <div id=""></div>
    </div>
  );
}

export default SearchPage;
