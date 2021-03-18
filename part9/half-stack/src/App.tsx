import React from "react";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartDescriptionBase {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDescriptionBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDescriptionBase {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

// interface CoursePartDescriptionBase extends CoursePartBase {
//   description: string;
// }

// interface CoursePartOne extends CoursePartDescriptionBase {
//   name: "Fundamentals";
// }

// interface CoursePartTwo extends CoursePartBase {
//   name: "Using props to pass data";
//   groupProjectCount: number;
// }

// interface CoursePartThree extends CoursePartDescriptionBase {
//   name: "Deeper type usage";
//   exerciseSubmissionLink: string;
// }

// interface CoursePartImaginary extends CoursePartDescriptionBase {
//   name: "Imaginary part";
//   imaginaryAttribute: string;
// }

// type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartImaginary;

const Header = ({ name }: { name: string }) => {
  return (
    <h1>{name}</h1>
  );
};

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part = ({ part }: { part: CoursePart }) => {
  const header = <h4>{`${part.name} |  exercise count: ${part.exerciseCount}`}</h4>;
  let content;
  switch (part.type) {
    case "normal":
      content = <p>{part.description}</p>;
      break;
    case "groupProject":
      content = <p>{`Project exercise count: ${part.groupProjectCount}`}</p>;
      break;
    case "submission":
      content = <p>
        {part.description}<br />
        {`Submit to: ${part.exerciseSubmissionLink}`}
      </p>;
      break;
    case "special":
      content = <p>
        {part.description}<br />
        {`Required skills: ${part.requirements.join(", ")}`}
      </p>;
      break;
    default:
      return assertNever(part);
  }
  return (
    <>
      {header}
      {content}
    </>

  );
};

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <div>
      {courseParts.map(p =>
        <Part key={p.name} part={p} />
      )}
    </div>
  );
};

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <p>
      Total number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal",
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special",
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

export default App;