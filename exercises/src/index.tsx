import React from "react";
import ReactDOM from "react-dom";
import Content from "./components/content";
import Header from "./components/header";
import Total from "./components/total";
import { CoursePart } from "./types";

// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
  },
  {
    name: "React components with TypeScript",
    exerciseCount: 2,
    description: "Learn about React and TS",
    author: "TS Author",
  },
];

const App: React.FC = () => {
  const courseName = "Half Stack application development";

  return (
    <div>
      <Header content={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
