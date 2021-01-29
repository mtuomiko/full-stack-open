import React from "react";
import ReactDOM from "react-dom";

interface coursePart {
  name: string,
  exerciseCount: number,
}

const Header: React.FC<{ name: string }> = ({ name }) => {
  return (
    <h1>{name}</h1>
  );
};

const CoursePart: React.FC<{ coursePart: coursePart }> = ({ coursePart }) => {
  return (
    <p>{coursePart.name} {coursePart.exerciseCount}</p>
  );
};

const Content: React.FC<{ courseParts: coursePart[] }> = ({ courseParts }) => {
  return (
    <>
      {courseParts.map(p =>
        <CoursePart key={p.name} coursePart={p} />
      )}
    </>
  );
};

const Total: React.FC<{ courseParts: coursePart[] }> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
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