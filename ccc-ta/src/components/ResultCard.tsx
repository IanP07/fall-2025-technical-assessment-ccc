import User from "../assets/icons/user.png";
import Star from "../assets/icons/star.png";

function ResultCard() {
  return (
    <div class="result-card">
      <div class="inner-card-section">
        <h2>John Snow VII</h2>
        <div class="profile-circle">
          <img src={User} style={{ width: "50%", marginBottom: "5px" }} />
        </div>
        <p>32 Reviews</p>
      </div>

      <div class="first-horizontal-bar"></div>

      <div id="result-rating-wrapper">
        <div class="inner-card-section">
          <div class="dropdown">
            <button class="dropdown-button">
              Course: <span style={{ color: "black" }}>CMSC131</span>
            </button>
            <div class="dropdown-content">
              <a href="#">All</a>
              <a href="#">CMSC131</a>
              <a href="#">CMSC132</a>
              <a href="#">CMSC351</a>
              <a href="#">CMSC216</a>
              <a href="#">CMSC250</a>
              <a href="#">CMSC426</a>
            </div>
          </div>

          <h1 style={{ color: "#4EC223" }} id="grade-text">
            A-
          </h1>

          <p>GPA: 3.51</p>
        </div>

        <div class="horizontal-bar"></div>

        <div class="inner-card-section">
          <h2 style={{ fontSize: "16px", marginTop: "20px" }}>
            Overall Rating:
          </h2>
          <img src={Star} style={{ width: "85px", marginTop: "10px" }} />
          <h2 style={{ fontSize: "36px", marginTop: "10px" }}>4.8/5</h2>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
