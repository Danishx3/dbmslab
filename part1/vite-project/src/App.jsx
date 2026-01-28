import CourseInfo from './components/CourseInfo'
import Unicafe from './components/Unicafe'
import Anecdotes from './components/Anecdotes'

const App = () => {
  return (
    <div>
      <section>
        <CourseInfo />
      </section>
      <hr />
      <section>
        <Unicafe />
      </section>
      <hr />
      <section>
        <Anecdotes />
      </section>
    </div>
  )
}

export default App