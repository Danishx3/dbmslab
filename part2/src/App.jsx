import { useState } from 'react'
import Notes from './components/Notes/Notes'
import CourseInfo from './components/CourseInfo/CourseInfo'
import Phonebook from './components/Phonebook/Phonebook'
import Countries from './components/Countries/Countries'

const App = () => {
  const [view, setView] = useState('notes')

  return (
    <div>
      <div className='navigation'>
        <button onClick={() => setView('notes')}>Notes</button>
        <button onClick={() => setView('courseinfo')}>Course Info</button>
        <button onClick={() => setView('phonebook')}>Phonebook</button>
        <button onClick={() => setView('countries')}>Countries</button>
      </div>

      <div className='content'>
        {view === 'notes' && <Notes />}
        {view === 'courseinfo' && <CourseInfo />}
        {view === 'phonebook' && <Phonebook />}
        {view === 'countries' && <Countries />}
      </div>
    </div>
  )
}

export default App
