import React from "react";
import ReactDOM from "react-dom";
import Content from "./components/content";
import Header from "./components/header";
import Total from "./components/total";
import { Course, CoursePart } from "./types";

const App: React.FC = () => {
  const _courseName = "Half Stack application development";
  const _courseParts: Array<CoursePart> = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];
  const course: Course = {
    name: _courseName,
    courseParts: _courseParts,
  };

  return (
    <div>
      <Header content={course.name} />
      <Content courseParts={course.courseParts} />
      <Total courseParts={course.courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
