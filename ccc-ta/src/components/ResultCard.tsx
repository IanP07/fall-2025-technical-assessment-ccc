import User from "../assets/icons/user.png";
import Star from "../assets/icons/star.png";
import { useState, useEffect } from "react";
import axios from "axios";

type ResultCardProps = {
  name: string;
  average_rating: number;
  courses: string[];
};

type allowedLetterGrades =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-"
  | "F";

function ResultCard({ name, average_rating, courses }: ResultCardProps) {
  const [reviewCount, setReviewCount] = useState(0);
  const [allCoursesSelected, setAllCoursesSelected] = useState(true);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const [currentCourse, setCurrentCourse] = useState("All");

  const [averageLetterGrade, setAverageLetterGrade] =
    useState<allowedLetterGrades>("A+");

  const [averageGPA, setAverageGPA] = useState(Number);

  const emptyGrades: Record<string, number> = {
    "A+": 0,
    A: 0,
    "A-": 0,
    "B+": 0,
    B: 0,
    "B-": 0,
    "C+": 0,
    C: 0,
    "C-": 0,
    "D+": 0,
    D: 0,
    "D-": 0,
    F: 0,
    W: 0,
  };

  // grabs reviews for each professor
  useEffect(() => {
    async function getReviewCount() {
      try {
        const response = await axios.get(
          `https://planetterp.com/api/v1/professor?name=${name}&reviews=true`
        );
        const data = response.data;

        // setReviewCount(data["reviews"].length);
        setReviewCount(data["reviews"].length);
      } catch (error) {
        console.log(`Error fetching review count: ${error}`);
      }
    }
    getReviewCount();
  }, []);

  useEffect(() => {
    async function initialCourseSelection() {
      setCurrentCourse("All");

      try {
        const response = await axios.get(
          `https://planetterp.com/api/v1/grades?professor=${name}`
        );
        const data = response.data;

        const gradeTotals: Record<string, number> = { ...emptyGrades };

        data.forEach((section: any) => {
          Object.keys(gradeTotals).forEach((grade) => {
            gradeTotals[grade] += section[grade] || 0;
          });
        });

        setCurrentCourseGrades(gradeTotals);
      } catch (error) {
        console.log(`Error fetching prof grade data: ${error}`);
      }
    }

    initialCourseSelection();
  }, [allCoursesSelected]);

  const [currentCourseGrades, setCurrentCourseGrades] = useState<
    Record<string, number>
  >({
    "A+": 0,
    A: 0,
    "A-": 0,
    "B+": 0,
    B: 0,
    "B-": 0,
    "C+": 0,
    C: 0,
    "C-": 0,
    "D+": 0,
    D: 0,
    "D-": 0,
    F: 0,
    W: 0,
  });

  async function handleCourseSelection(course: string) {
    setCurrentCourse(course);

    try {
      const response = await axios.get(
        `https://planetterp.com/api/v1/grades?course=${course}&professor=${name}`
      );
      const data = response.data;

      const gradeTotals: Record<string, number> = { ...emptyGrades };

      data.forEach((section: any) => {
        Object.keys(gradeTotals).forEach((grade) => {
          gradeTotals[grade] += section[grade] || 0;
        });
      });

      setCurrentCourseGrades(gradeTotals);
    } catch (error) {
      console.log(`Error fetching prof grade data: ${error}`);
    }
  }

  useEffect(() => {
    console.log(currentCourseGrades);

    const totalGradeNum =
      currentCourseGrades["A+"] +
      currentCourseGrades["A"] +
      currentCourseGrades["A-"] +
      currentCourseGrades["B+"] +
      currentCourseGrades["B"] +
      currentCourseGrades["B-"] +
      currentCourseGrades["C+"] +
      currentCourseGrades["C"] +
      currentCourseGrades["C-"] +
      currentCourseGrades["D+"] +
      currentCourseGrades["D"] +
      currentCourseGrades["D-"] +
      currentCourseGrades["F"] +
      currentCourseGrades["W"];

    const totalGPANum =
      currentCourseGrades["A+"] * 4.0 +
      currentCourseGrades["A"] * 4.0 +
      currentCourseGrades["A-"] * 3.7 +
      currentCourseGrades["B+"] * 3.3 +
      currentCourseGrades["B"] * 3.0 +
      currentCourseGrades["B-"] * 2.7 +
      currentCourseGrades["C+"] * 2.3 +
      currentCourseGrades["C"] * 2.0 +
      currentCourseGrades["C-"] * 1.7 +
      currentCourseGrades["D+"] * 1.3 +
      currentCourseGrades["D"] * 1.0 +
      currentCourseGrades["D-"] * 0.7 +
      currentCourseGrades["F"] * 0 +
      currentCourseGrades["W"] * 0;

    const avgGPA = Math.round((100 * totalGPANum) / totalGradeNum) / 100;

    if (avgGPA == 4) {
      setAverageLetterGrade("A+");
    } else if (avgGPA > 3.7) {
      setAverageLetterGrade("A");
    } else if (avgGPA > 3.3) {
      setAverageLetterGrade("A-");
    } else if (avgGPA > 3.0) {
      setAverageLetterGrade("B+");
    } else if (avgGPA > 2.7) {
      setAverageLetterGrade("B");
    } else if (avgGPA > 2.3) {
      setAverageLetterGrade("B-");
    } else if (avgGPA > 2) {
      setAverageLetterGrade("C+");
    } else if (avgGPA > 1.7) {
      setAverageLetterGrade("C-");
    } else if (avgGPA > 1.3) {
      setAverageLetterGrade("D+");
    } else if (avgGPA > 1) {
      setAverageLetterGrade("D");
    } else if (avgGPA > 0.7) {
      setAverageLetterGrade("D-");
    } else {
      setAverageLetterGrade("F");
    }

    setAverageGPA(avgGPA);
  }, [currentCourseGrades]);

  return (
    <div className="result-card">
      <div className="inner-card-section">
        <h2>{name}</h2>
        <div className="profile-circle">
          <img src={User} style={{ width: "50%", marginBottom: "5px" }} />
        </div>
        <p>{reviewCount} Reviews</p>
      </div>

      <div className="first-horizontal-bar"></div>

      <div id="result-rating-wrapper">
        <div className="inner-card-section">
          <div className="dropdown">
            <button
              className="dropdown-button"
              onClick={() => setIsDropDownOpen((prev) => !prev)}
            >
              Course: <span style={{ color: "black" }}>{currentCourse}</span>
            </button>
            {isDropDownOpen && (
              <div className="dropdown-content">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setIsDropDownOpen(false);
                    setAllCoursesSelected((prev) => !prev);
                  }}
                  href="#"
                >
                  All
                </a>
                {[...new Set(courses)].map((course) => (
                  <a
                    key={course}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDropDownOpen(false);
                      handleCourseSelection(course);
                    }}
                  >
                    {course}
                  </a>
                ))}
              </div>
            )}
          </div>

          <h1 style={{ color: "#4EC223" }} id="grade-text">
            {averageLetterGrade}
          </h1>

          <p>GPA: {averageGPA}</p>
        </div>

        <div className="horizontal-bar"></div>

        <div className="inner-card-section">
          <h2 style={{ fontSize: "16px", marginTop: "20px" }}>
            Overall Rating:
          </h2>
          <img src={Star} style={{ width: "85px", marginTop: "10px" }} />
          <h2 style={{ fontSize: "36px", marginTop: "10px" }}>
            {Math.round(average_rating * 10) / 10 + "/5"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
