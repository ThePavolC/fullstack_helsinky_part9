export interface CoursePart {
  name: string;
  exerciseCount: number;
}

export interface Course {
  name: string;
  courseParts: Array<CoursePart>;
}
