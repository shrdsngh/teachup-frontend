import axios from "../axios";
import React, { useEffect, useState } from "react";
import Logout from "./Logout";

const level = ["Beginner", "Intermediate", "Advanced"];
const batch = [
  {
    name: "morning batch",
    time: "8AM to 12PM",
  },
  {
    name: "evening batch",
    time: "2PM to 6PM",
  },
  {
    name: "both",
    time: "8AM to 12PM & 2PM to 6PM",
  },
];

function Adminpage() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    function getData() {
      axios
        .get("/admin/fetchTeachers")
        .then((res) => setTeachers(res.data))
        .catch((err) => console.log(err));
    }
    getData();
  }, []);

  return (
    <>
      <h2>Welcome Admin!</h2>
      <Logout />
      <TeacherList teachers={teachers} />
      <AddCourse teachers={teachers} />
    </>
  );
}

function TeacherList({ teachers }) {
  return (
    <>
      <div className="box">
        <h3>Teachers List</h3>
        {teachers.map((teacher) => (
          <p key={teacher.username}>{teacher.username}</p>
        ))}
      </div>
    </>
  );
}

function AddCourse({ teachers }) {
  const [courseName, setCourseName] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [tutor, setTutor] = useState("shrd");
  const [dateValue, setDateValue] = useState("");
  const [description, setDescription] = useState("");
  const [lectureLevel, setLectureLevel] = useState("Beginner");
  const [lectureBatch, setLectureBatch] = useState("morning batch");

  const [message, setMessage] = useState("");

  function handleCourseName(e) {
    setCourseName(e.target.value);
    setMessage("");
  }

  function handleImageLink(e) {
    setImageLink(e.target.value);
    setMessage("");
  }

  function handleTutor(e) {
    setTutor(e.target.value);
    setMessage("");
  }

  function handleLectureDate(e) {
    setDateValue(e.target.value);
    setMessage("");
  }

  function handleDescription(e) {
    setDescription(e.target.value);
    setMessage("");
  }

  function handleLevel(e) {
    setLectureLevel(e.target.value);
    setMessage("");
  }

  function handleBatch(e) {
    setLectureBatch(e.target.value);
    setMessage("");
  }

  function HandleAddCourse(e) {
    e.preventDefault();
    let courseObject = {
      courseName,
      imageLink,
      tutor,
      dateValue,
      description,
      lectureLevel,
      lectureBatch,
    };
    console.log(courseObject);
    if (IsValidate()) {
      axios
        .post("admin/addCourse", courseObject)
        .then((res) => {
          if (res.data.message === "Course Added Successfully") {
            alert("Course Added Successfully");
            //   navigate("/login");
          } else {
            setMessage(res.data.message);
          }
        })
        .catch((err) => console.warn(err));
    } else {
      setMessage("Please provide all the values");
    }
  }

  function IsValidate() {
    let isProceed = true;
    if (courseName === "" || courseName === null) {
      isProceed = false;
    }
    if (imageLink === "" || imageLink === null) {
      isProceed = false;
    }
    if (tutor === "" || tutor === null) {
      isProceed = false;
    }
    if (dateValue === "" || dateValue === null) {
      isProceed = false;
    }
    if (description === "" || description === null) {
      isProceed = false;
    }
    if (lectureBatch === "" || lectureBatch === null) {
      isProceed = false;
    }
    if (lectureLevel === "" || lectureLevel === null) {
      isProceed = false;
    }
    return isProceed;
  }

  return (
    <div className="add-course">
      <form>
        <input
          type="text"
          placeholder="Course Name"
          style={{ width: "200px" }}
          value={courseName}
          onChange={handleCourseName}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Course Image Link"
          style={{ width: "200px" }}
          value={imageLink}
          onChange={handleImageLink}
        />
        <br />
        <br />
        <span>
          <em>Instructor</em>
        </span>{" "}
        <select value={tutor} onChange={handleTutor}>
          {teachers.map((teacher) => (
            <option key={teacher.username} value={teacher.username}>
              {teacher.username}
            </option>
          ))}
        </select>
        <br />
        <br />
        <span>
          <em>Lecture Date</em>
        </span>{" "}
        <input type="date" value={dateValue} onChange={handleLectureDate} />
        <br />
        <br />
        <textarea
          placeholder="Description"
          style={{ width: "300px", height: "200px" }}
          value={description}
          onChange={handleDescription}
        />
        <br />
        <br />
        <span>
          <em>Level</em>{" "}
        </span>
        <select value={lectureLevel} onChange={handleLevel}>
          {level.map((single) => (
            <option key={single} value={single}>
              {single}
            </option>
          ))}
        </select>
        <br />
        <br />
        <span>
          <em>Lecture</em>{" "}
        </span>
        <select
          value={lectureBatch}
          onChange={handleBatch}
          defaultValue={batch[0]}
        >
          {batch.map((single, index) => (
            <option key={single.name} value={single.time}>
              {single.name}
            </option>
          ))}
        </select>
        <br />
        <br />
        {message ? <p style={{ color: "red" }}>{message}</p> : null}
        <button onClick={(e) => HandleAddCourse(e)}>Add Course</button>
      </form>
    </div>
  );
}

export default Adminpage;
