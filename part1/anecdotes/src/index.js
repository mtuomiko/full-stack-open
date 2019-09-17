import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ text }) => <h1>{text}</h1>

const Anecdote = ({ selected, anecdotes }) => {
    return (
        <p>{anecdotes[selected]}</p>
    )
}

const Button = (props) => {
    const { onClick, text } = props
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
}

const Votes = (props) => {
    const { selected, votes} = props
    return (
        <p>has {votes[selected]} votes</p>
    )
}

const MostVotes = ({ anecdotes, votes }) => {
    let maxVotes = votes[0];
    let maxAnecdote = 0;
    for (let i = 1; i < votes.length; i++) {
        if (votes[i] > maxVotes) {
            maxVotes = votes[i];
            maxAnecdote = i;
        }
    }
    return (
        <>
            <Anecdote selected={maxAnecdote} anecdotes={anecdotes} />
            <Votes selected={maxAnecdote} votes={votes} />
        </>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    // Create new array with size based on number of anecdotes and set as state
    const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))

    const handleNext = () => {
        return (
            // Set selected state to a random number (within anecdotes array)
            setSelected(Math.floor(Math.random() * props.anecdotes.length))
        )
    }

    const handleVote = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        return (
            setVotes(newVotes)
        )
    }

    return (
        <div>
            <Heading text="Anecdote of the day" />
            <Anecdote anecdotes={props.anecdotes} selected={selected} />
            <Votes selected={selected} votes={votes} />
            <Button onClick={handleVote} text="Vote" />
            <Button onClick={handleNext} text="Next anecdote" />

            <Heading text="Anecdote with most votes" />
            <MostVotes anecdotes={anecdotes} votes={votes} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
