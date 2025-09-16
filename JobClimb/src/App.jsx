import "./App.css"
import JobCard from "./JobCard"
import Options from './Options'
import { DndProvider } from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"

function App() {
  const job = {
    id:'1',
    company: 'Google',
    position: 'Software Engineer',
    address:'Mountain Side, CA',
    salary: '$12,500',
    startDate: '01/2/2026',
    notes: "Great work culture, fits my skillsets",
    status:'to-apply'
  }
  return(
    <>
    <div>
      <DndProvider backend={HTML5Backend}>
        <JobCard job={job}></JobCard>
      </DndProvider>
      <Options></Options>
    </div>
    </>
  )
}

export default App
