import Dollar from './assets/Dollar.svg'
import Briefcase from './assets/Briefcase.svg'
import Calendar from './assets/Calendar.svg'
import Location from './assets/Location.svg'
import OptionsIcon from './assets/Options.svg'
import Options from './Options'
import {Card, CardHeader, CardContent} from './components/Card'
import {useDrag} from 'react-dnd';
import './JobCard.css'
import { useState } from 'react'


function JobCard({job, jobs, setJobs}) {

    const [isOptionOpen, setIsOptionOpen] = useState(false)
    const[currentJobCard, setCurrentJobCard] = useState('')

    const handleOpenOption = (jobID) =>{
        if(isOptionOpen && currentJobCard == job.id){
            setIsOptionOpen(false);
            setCurrentJobCard('');}
        else{
            setCurrentJobCard(jobID);
            setIsOptionOpen(true);}
        }

    const [{isDragging},dragRef] = useDrag({
        type:'job',
        //when dragging, it needs to know what job is dragging dragged and the current status of the job card
        item: {id: job.id, status: job.status},
        //the monitor is provided by the dnd that queries the current drag/drop interaction
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })


    return (
        //if isDragging is true then add dragging className
        //otherwise add nothing
        <div className={`job-card ${isDragging ? 'dragging' : ''}`} ref={dragRef}>
            <Card className="card">
                <CardHeader>
                    <div className="mainline-container">
                        <div className="main-title">
                            <img src={Briefcase} alt="Briefcase Icon" className="briefcase-icon"></img>
                            <p className="company">{job.company} </p>
                        </div>
                        <div className="options">
                            <button onClick={()=> handleOpenOption(job.id)}>
                                <img src={OptionsIcon} alt="Options" className="options-icon"></img>
                            </button>
                            {isOptionOpen && currentJobCard === job.id && (<Options 
                                onOpen = {handleOpenOption}
                                currentJob = {currentJobCard}
                                jobs= {jobs}
                                setJobs={setJobs}
                            />)}
                        </div>
                    </div>
                    <p className="position">{job.position} </p>
                </CardHeader>
                <CardContent>
                    <div>
                        <div className="information-container">
                            <div className="information">
                                <img src={Location} alt="Location Icon"></img>
                                <span className="">{job.location}</span>
                            </div>
                            <div className="information">
                                <img src={Dollar} alt="Dollar Icon"></img>
                                <span className="">{job.salary}</span>
                            </div>                    
                            <div className="information">
                                <img src={Calendar} alt="Calendar Icon"></img>
                                <span className="">{job.startDate}</span>
                            </div>
                        </div>
                        <div className="notes-section">
                            <p className="notes-title">Notes:</p>
                            <p className="notes-content">{job.notes}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default JobCard