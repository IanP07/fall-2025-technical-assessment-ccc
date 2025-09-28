import rightArrow from "../assets/icons/rightArrow.png";

function LandingPage() {
  return (
    <div id="landing-main">
      <div id="landing-page-background">
        <div id="landing-page-text-div">
          <h1>Find My Professor</h1>
          <h2 id="landing-subtext">
            Want to know more about the professors here at UMD? This is the
            perfect place to learn a bit about the courses they teach and their
            grade distributions.
          </h2>
        </div>
      </div>

      <div id="landing-search">
        <h1 style={{ color: "black", fontSize: 36 }}>
          Enter a Professor to Start
        </h1>
        <input
          id="landing-page-input"
          style={{ marginTop: "20px" }}
          className="search-bar"
          placeholder="Enter professor name..."
        ></input>

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
              <p class="recent-results-text">John Jane Doe</p>
              <img style={{ height: "30px" }} src={rightArrow}></img>
            </div>
            <div className="recent-results-div">
              <p class="recent-results-text">John Middle Doe</p>
              <img style={{ height: "30px" }} src={rightArrow}></img>
            </div>
            <div className="recent-results-div">
              <p class="recent-results-text">John John Jane</p>
              <img style={{ height: "30px" }} src={rightArrow}></img>
            </div>
          </div>
        </div>
        <p
          class="disclaimer-text"
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
