import React from "react";
import { CoursePart } from "../types";
import Part from "./part";

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map((part) => (
        <Part key={part.name} coursePart={part} />
      ))}
    </>
  );
};

export default Content;
