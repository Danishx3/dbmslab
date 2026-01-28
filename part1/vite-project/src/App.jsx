import { useState } from 'react'
import CourseInfo from './components/CourseInfo'
import Unicafe from './components/Unicafe'
import Anecdotes from './components/Anecdotes'
import './App.css'

const App = () => {
  const [view, setView] = useState('courseinfo')

  return (
    <div>
      <div className="navigation">
        <button onClick={() => setView('courseinfo')}>Course Info</button>
        <button onClick={() => setView('unicafe')}>Unicafe</button>
        <button onClick={() => setView('anecdotes')}>Anecdotes</button>
      </div>

      <div className="content">
        {view === 'courseinfo' && <CourseInfo />}
        {view === 'unicafe' && <Unicafe />}
        {view === 'anecdotes' && <Anecdotes />}
      </div>
    </div>
  )
}

export default App