import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescriptionBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescriptionBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartImaginary extends CoursePartDescriptionBase {
  name: "Imaginary part";
  imaginaryAttribute: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartImaginary;

const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  let content = "";
  switch (part.name) {
    case "Fundamentals":
      content = `Name: ${part.name} Exercise count: ${part.exerciseCount} Description: ${part.description}`;
      break;
    case "Using props to pass data":
      content = `Name: ${part.name} Exercise count: ${part.exerciseCount} Group project count: ${part.groupProjectCount}`;
      break;
    case "Deeper type usage":
      content = `Name: ${part.name} Exercise count: ${part.exerciseCount} Description: ${part.description} Exercise submission link: ${part.exerciseSubmissionLink}`;
      break;
    case "Imaginary part":
      content = `Name: ${part.name} Exercise count: ${part.exerciseCount} Description: ${part.description} Imaginary attribute: ${part.imaginaryAttribute}`;
      break;
    default:
      return assertNever(part);
  }
  return (
    <p>{content}</p>
  );
};

const Content: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map(p =>
        <Part key={p.name} part={p} />
      )}
    </>
  );
};

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Imaginary part",
      exerciseCount: 5,
      description: "This part does not exist!",
      imaginaryAttribute: "Yep, imagine that",
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));