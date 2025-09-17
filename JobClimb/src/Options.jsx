import Edit from './assets/Edit.svg'
import Delete from './assets/Delete.svg'
import './Options.css'

function Options({onOpen, onEdit,  currentJob, jobs, setJobs}){
    const deleteJob =(jobID) =>{
        const updatedJobs = jobs.filter(job => job.id !== jobID);
        setJobs(updatedJobs)
    }


    return(
        <div className="options-container">
            <button className="edit-container" onClick={()=>onEdit(currentJob)}>
                <img src={Edit} alt="Edit Icon"></img>
                <p>Edit</p>
            </button>
            <button className="delete-container" onClick={()=> deleteJob(currentJob.id)}>
                <img src={Delete} alt="Delete Icon"></img>
                <p>Delete</p>
            </button>
        </div>
    )
}


export default Options