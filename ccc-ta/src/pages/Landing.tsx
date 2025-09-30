import bookStack from "../assets/stack-of-books.png";
import rightArrow from "../assets/icons/rightArrow.png";
import searchIcon from "../assets/icons/searchICon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LandingPage() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const switchPage = () => {
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div id="landing-main">
      <div id="landing-page-background" style={{ position: "relative" }}>
        <div
          id="landing-page-text-div"
          style={{ position: "relative", zIndex: 1 }}
        >
          <h1>Find My Professor</h1>
          <h2 id="landing-subtext">
            Want to know more about the professors here at UMD? This is the
            perfect place to learn a bit about the courses they teach and their
            grade distributions.
          </h2>
        </div>
        <img
          src={bookStack}
          style={{
            width: "200px",
            height: "200px",
            position: "absolute",
            top: "90px",
            right: "10vw",
          }}
        />
      </div>

      <div id="landing-search">
        <h1 style={{ color: "black", fontSize: 36 }}>
          Enter a Professor to Start
        </h1>

        <div id="search-bar-wrapper">
          <input
            id="landing-page-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
            placeholder="Enter name..."
          ></input>
          <div className="search-button-div" onClick={switchPage}>
            <img src={searchIcon} style={{ width: "30px", height: "auto" }} />
          </div>
        </div>

        <div
          id="recent-results-outer-holder"
          style={{
            display: "flex",
            maxWidth: "762px",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              color: "black",
              fontSize: 22.5,
              marginTop: "75px",
            }}
          >
            Recent Results
          </h1>
          <div
            id="recent-results-holder"
            style={{ display: "flex", gap: "10px" }}
          >
            <div className="recent-results-div">
              <p className="recent-results-text">John Jane Doe</p>
              <img style={{ height: "30px" }} src={rightArrow}></img>
            </div>
            <div className="recent-results-div">
              <p className="recent-results-text">John Middle Doe</p>
              <img style={{ height: "30px" }} src={rightArrow}></img>
            </div>
            <div className="recent-results-div">
              <p className="recent-results-text">John John Jane</p>
              <img style={{ height: "30px" }} src={rightArrow}></img>
            </div>
          </div>
        </div>
        <p
          className="disclaimer-text"
          style={{
            marginTop: "auto",
            paddingTop: "65px",
            paddingBottom: "5px",
            color: "#AAAAAA",
          }}
        >
          Disclaimer: All data is gathered from the{" "}
          <span style={{ color: "#B95F5F" }}>
            <a href="https://planetterp.com/api/">
              <u>PlanetTerp</u>
            </a>
          </span>{" "}
          API
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
