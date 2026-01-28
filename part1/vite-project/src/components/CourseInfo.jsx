const Header = ({ course }) => {
    return <h1>{course.name}</h1>
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map((part) => (
                <Part key={part.name} part={part} />
            ))}
        </div>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return <p><strong>Number of exercises {total}</strong></p>
}

const CourseInfo = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default CourseInfo
