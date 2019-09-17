import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = (props) => {
    const { text } = props
    return (
        <h1>{text}</h1>
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

const Statistic = (props) => {
    const { text, value } = props
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = (props) => {
    const { good, neutral, bad } = props
    const total = good + neutral + bad
    if (total === 0) {
        return (
            <p>No feedback yet</p>
        )
    }
    const average = ( (good * 1) + (bad * -1) ) / total
    const positivePercentage = ((good / total) * 100) + " %"
    return (
        <table>
            <tbody>
                <Statistic text="Good" value={good} />
                <Statistic text="Neutral" value={neutral} /> 
                <Statistic text="Bad" value={bad} />
                <Statistic text="Total" value={total} />
                <Statistic text="Average" value={average} />
                <Statistic text="Positive" value={positivePercentage} />
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => setGood(good + 1)
    const handleNeutralClick = () => setNeutral(neutral + 1)
    const handleBadClick = () => setBad(bad + 1)

    return (
        <div>
            <Heading text="Give feedback" />
            <Button onClick={handleGoodClick} text="Good" />
            <Button onClick={handleNeutralClick} text="Neutral" />
            <Button onClick={handleBadClick} text="Bad" />

            <Heading text="Feedback statistics" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)