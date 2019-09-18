import React from 'react'

const Title = props =>
  <h3>{props.text}</h3>

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((acc, next) => {
    return acc + next.exercises
  }, 0)

  return (
    <p>Total of {total} exercises</p>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Title text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

export default Course