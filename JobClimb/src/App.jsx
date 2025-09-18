
import "./App.css"
import Header from './Header'
import Column from './Column'
import { DndProvider } from "react-dnd"
import {HTML5Backend} from "react-dnd-html5-backend"
import { TouchBackend } from 'react-dnd-touch-backend';

function App() {
  const job = {
    id:'1',
    company: 'Google',
    position: 'Software Engineer',
    location:'Mountain Side, CA',
    salary: '$12,500',
    startDate: '01/2/2026',
    notes: "Great work culture, fits my skillsets",
    status:'to-apply'
  }

  // Choose backend based on screen width
  const isMobileOrTablet = window.innerWidth <= 1024;

  return(
    <>
    <div>
      <Header/>
       <DndProvider
        backend={isMobileOrTablet ? TouchBackend : HTML5Backend}
        options={
          isMobileOrTablet
            ? { enableMouseEvents: true, enableTouchEvents: true, delayTouchStart: 0}
            : undefined
        }
      >
        <Column/>
      </DndProvider>
    </div>
    </>
  )

}

export default App
