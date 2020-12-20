import React from "react";
import { CoursePart } from "../types";

interface PartProps {
  coursePart: CoursePart;
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part: React.FC<PartProps> = ({ coursePart }) => {
  let content;
  switch (coursePart.name) {
    case "Fundamentals":
      content = (
        <p>
          <b>{coursePart.name}</b>
          <li>exercise count: {coursePart.exerciseCount}</li>
          <li>description: {coursePart.description}</li>
        </p>
      );
      break;
    case "Using props to pass data":
      content = (
        <p>
          <b>{coursePart.name}</b>
          <li>exercise count: {coursePart.exerciseCount}</li>
          <li>group project count: {coursePart.groupProjectCount}</li>
        </p>
      );
      break;
    case "Deeper type usage":
      content = (
        <p>
          <b>{coursePart.name}</b>
          <li>exercise count: {coursePart.exerciseCount}</li>
          <li>exercise submission link: {coursePart.exerciseSubmissionLink}</li>
        </p>
      );
      break;
    case "React components with TypeScript":
      content = (
        <p>
          <b>{coursePart.name}</b>
          <li>exercise count: {coursePart.exerciseCount}</li>
          <li>description: {coursePart.description}</li>
          <li>author: {coursePart.author}</li>
        </p>
      );
      break;
    default:
      return assertNever(coursePart);
  }

  return content;
};

export default Part;
