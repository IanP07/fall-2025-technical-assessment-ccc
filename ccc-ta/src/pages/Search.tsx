import leftArrow from "../assets/icons/leftarrow.png";
import searchIcon from "../assets/icons/searchICon.png";
import { Link } from "react-router-dom";
import ResultCard from "../components/ResultCard";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function SearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query");

  type Professor = {
    courses: string[];
    average_rating: number;
    type: string;
    name: string;
    slug: string;
  };

  const [professors, setProfessors] = useState<Professor[]>([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // sets input to input passed from landing page
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setDebouncedQuery(initialQuery);
    }
  }, [initialQuery]);

  useEffect(() => {
    console.log(professors);
  }, [professors]);

  // Waits 50ms after typing to call API, to ensure the API won't be overloaded
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 50);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // GET requests, re-calls when debouncedInput changes
  useEffect(() => {
    if (!debouncedQuery) return;
    const fetchProfessors = async () => {
      try {
        const { data } = await axios.get(
          `https://planetterp.com/api/v1/search?query=${debouncedQuery}`
        );
        const professorList = data.filter(
          (item: { type: string }) => item.type === "professor"
        );

        const profDetails = await Promise.all(
          professorList.map(async (prof: any) => {
            const { data: details } = await axios.get(
              `https://planetterp.com/api/v1/professor?name=${prof.name}`
            );
            return {
              ...prof,
              average_rating: details.average_rating,
              courses: details.courses,
            };
          })
        );

        setProfessors(profDetails);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfessors();
  }, [debouncedQuery]);

  return (
    <div id="search-main">
      <div id="search-page-topbar">
        <Link to="/">
          <div id="return-div">
            <img src={leftArrow} style={{ width: "25px" }} />
            <p style={{ marginTop: "3px" }}>Return</p>
          </div>
        </Link>
      </div>

      <div id="search-bar-wrapper" style={{ marginTop: "20px" }}>
        <input
          id="landing-page-input"
          className="search-bar"
          placeholder="Enter name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
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
        {professors.map((prof) => (
          <ResultCard
            key={prof.slug}
            name={prof.name}
            average_rating={prof.average_rating}
            courses={prof.courses}
          />
        ))}
      </div>

      <p
        className="disclaimer-text"
        style={{
          marginTop: "auto",
          paddingTop: "200px",
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
  );
}

export default SearchPage;
