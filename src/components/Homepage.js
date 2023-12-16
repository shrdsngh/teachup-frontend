import axios from "../axios";
import React, { useEffect, useState } from "react";
import Logout from "./Logout";

function Homepage() {
  const [assignedCourse, setAssignedCourse] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("user");
    axios
      .post("/user/fetchCourse", { username })
      .then((res) => {
        setAssignedCourse(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Logout />
      {assignedCourse.length === 0 ? (
        <p>You don't have any upcoming lectures</p>
      ) : (
        assignedCourse.map((single, index) => (
          <CourseCard
            key={index}
            name={single.courseName}
            date={single.dateValue}
            index={index}
          />
        ))
      )}
    </div>
  );
}

function CourseCard({ name, date, index }) {
  return (
    <>
      {index === 0 ? <h1>Here are your upcoming lectures</h1> : null}
      <div style={{ border: "1px solid grey", margin: "5px" }}>
        <p>
          LECTURE NAME: <em>{name}</em>
        </p>
        <p>
          LECTURE DATE: <em>{date}</em>
        </p>
        <br />
      </div>
    </>
  );
}

export default Homepage;
