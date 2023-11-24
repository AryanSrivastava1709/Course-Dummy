import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { useState } from "react";
function Main() {
  const [details, setDetails] = useState([]);
  const [students, setStudents] = useState(0);
  function addDetails(item) {
    if (students < 10) setDetails((s) => [...s, item]);
  }
  function Add() {
    if (students < 10) {
      setStudents((s) => s + 1);
    }
  }
  function Dec(id) {
    if (students > 0) {
      setDetails((s) => s.filter((ward) => ward.id !== id));
      setStudents((s) => s - 1);
    }
  }
  return (
    <div>
      <Header />
      <Body
        handleAddButton={Add}
        handleDecButton={Dec}
        name={details}
        handleDetailAdd={addDetails}
        students={students}
      />
      <Footer students={students} />
    </div>
  );
}

function Header() {
  return (
    <div>
      <p className=" bg-black text-blue-600 p-5 text-center text-2xl font-bold">
        React course
      </p>
    </div>
  );
}
function Form({ handleAddButton, handleDetailAdd }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (name) {
      const newItem = {
        name,
        age,
        id: Date.now(),
        imgSRC: "https://i.pravatar.cc/300",
      };
      handleDetailAdd(newItem);
      handleAddButton();
    }
    setName("");
    setAge("");
  }
  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit}>
        <label className=" mr-10">Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className=" ml-10 mr-10">Age:</label>
        <input
          type="text"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <p className=" text-lg font-bold ml-4">
          Enroll: <button className=" text-2xl ml-11">+</button>
        </p>
      </form>
    </div>
  );
}
function Body({
  handleAddButton,
  handleDecButton,
  name,
  handleDetailAdd,
  students,
}) {
  const isStudent = students > 0;
  return (
    <div>
      <div className="p-3 bg-sky-500 flex justify-between">
        <p className=" text-lg font-bold ml-4">
          Student Enrolled in React Course 😁
        </p>
        <div className=" mr-10">
          <Form
            handleAddButton={handleAddButton}
            handleDetailAdd={handleDetailAdd}
          />
        </div>
      </div>
      {isStudent ? (
        <div>
          <div className="grid grid-cols-2 gap-8 ml-56">
            {name.map((details) => (
              <Students
                detail={details}
                key={details.name}
                handleDecButton={handleDecButton}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className=" text-2xl font-bold p-10 text-center">
          Hello!! Welcome to the course ⚛️...Type your name in the above form 😁
        </p>
      )}
    </div>
  );
}

function Students({ detail, handleDecButton }) {
  return (
    <div className=" border-black border-2 w-96">
      <img src={detail.imgSRC} alt="avatar image" className=" h-44 ml-20" />
      <p>
        <span className=" text-lg font-bold text-blue-600 ml-20">Name: </span>
        {detail.name}
      </p>
      <p>
        <span className="text-lg font-bold text-blue-600 ml-20">Age: </span>
        {detail.age}
      </p>
      <button
        className=" text-lg font-bold  text-red-600 ml-20"
        onClick={() => handleDecButton(detail.id)}
      >
        Enroll Out
      </button>
    </div>
  );
}
function Footer({ students }) {
  console.log(students);
  const minStudents = 0;
  const maxStudents = 10;
  const areStudents = students >= minStudents && students < maxStudents;
  console.log(areStudents);
  return (
    <div
      className="
     bg-black text-white text-xl p-5"
    >
      <p className=" flex flex-row  justify-between font-bold">
        Copyright®️ React Course Ltd
        {areStudents ? (
          <span>
            Seats Left: {maxStudents - students}. We are taking in students
          </span>
        ) : (
          <span>Student: {students}. The batch is full</span>
        )}
      </p>
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
