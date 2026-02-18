import { useState } from 'react'

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = (props) => {
    const { good, neutral, bad, verygood } = props
    const total = good + neutral + bad + 2 * verygood
    const average = total === 0 ? 0 : (good + 2 * verygood - bad) / total
    const positive = total === 0 ? 0 : (good + 2 * verygood - bad) / total * 100

    if (total === 0) {
        return (
            <div>
                No feedback given
            </div>
        )
    }

    return (
        <table>
            <tbody>
                <StatisticLine text="very good" value={verygood} />
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={total} />
                <StatisticLine text="average" value={average.toFixed(1)} />
                <StatisticLine text="positive" value={positive.toFixed(1) + " %"} />
            </tbody>
        </table>
    )
}

const Unicafe = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [verygood, setVeryGood] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>
            <Button handleClick={() => setVeryGood(verygood + 1)} text="very good" />
            <Button handleClick={() => setGood(good + 1)} text="good" />
            <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
            <Button handleClick={() => setBad(bad + 1)} text="bad" />

            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad} verygood={verygood} />
        </div>
    )
}

export default Unicafe
