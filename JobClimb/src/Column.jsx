import {useState} from "react";
import JobCard from "./JobCard.jsx";
import AddJobModel from "./AddJobModel.jsx";
import StatsBar from "./StatsBar.jsx";
import Check from "./assets/Check.svg";
import Clock from "./assets/Clock.svg";
import Send from "./assets/Send.svg";
import './Column.css';
import {useDrop} from 'react-dnd';

function Column() {
    // State management
    const [jobs, setJobs] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentColumn, setCurrentColumn] = useState('');
    const [jobToEdit, setJobToEdit] = useState('');

    // Column configuration
    const columns = [
        { id: 'to-apply', title: 'To Apply' },
        { id: 'in-progress', title: 'In Progress' },
        { id: 'offers-received', title: 'Offers Received' }
    ];

    const columnColors= {
        'to-apply': '#F2B95D',
        'in-progress':'#A9AEDA',
        'offers-received':'#A5D192',

    }

    const columnIcons={
        'to-apply': Send,
        'in-progress':Clock,
        'offers-received':Check,
    }

    const columnBtnColors= {
        'to-apply': '#FFD083',
        'in-progress':'#CFD3F8',
        'offers-received':'#C2DBB7',

    }

    const columnTextColors= {
        'to-apply': '#6D4300',
        'in-progress':'#040B43',
        'offers-received':'#1A3D0B',

    }
    // Modal handlers
    const handleAddJob = (column) => {
        setCurrentColumn(column);
        setIsAddModalOpen(true);
        setJobToEdit(null);
    };

    const handleEditJob = (job) =>{
        setCurrentColumn(job.status)
        setJobToEdit(job);
        setIsAddModalOpen(true);
    }

    const handleSaveJob = (jobData) => {
        if(jobToEdit){
            const updatedJobs = jobs.map(job =>
                job.id === jobData.id ? jobData : job
            )
            setJobs(updatedJobs)
            setIsAddModalOpen(false)
            setJobToEdit('')
        }else{
        setJobs([...jobs, jobData]);
        setIsAddModalOpen(false);}
    };

    //handle closing of modals
    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        setCurrentColumn('');
    };


    // Utility function to get jobs for a specific column
    const getJobsForColumn = (columnId) => {
        return jobs.filter(job => job.status === columnId);
    };

    // counts for StatsBar
    const toApplyCount = getJobsForColumn('to-apply').length;
    const inProgressCount = getJobsForColumn('in-progress').length;
    const offersCount = getJobsForColumn('offers-received').length;

    return(
        <>
            <StatsBar
                toApplyCount={toApplyCount}
                inProgressCount={inProgressCount}
                offersCount={offersCount}
            />
           <div className="column-container">
            {columns.map(column => {
                const [{ isOver }, dropRef] = useDrop({
                    accept: 'job',
                    drop: (draggedJob) => {
                    setJobs(prevJobs => prevJobs.map(job =>
                        job.id === draggedJob.id ? { ...job, status: column.id } : job
                    ));
                    },
                    collect: (monitor) => ({
                    isOver: monitor.isOver(),
                    }),
                });

                return(
                <div key={column.id} className="column" ref={dropRef}>
                    <div className="column-header" style={{backgroundColor: columnColors[column.id] ||  transparent}}>
                        <div className="icon-and-title">
                            <img src={columnIcons[column.id]} alt="Column Icon" className="header-icon"></img>
                            <p className="column-title" style={{color: columnTextColors[column.id]}}>{column.title}</p>
                        </div>
                        <button className="add-job-btn" onClick={()=>handleAddJob(column.id)} title={`Add job to ${column.title}`} style={{backgroundColor: columnBtnColors[column.id]|| transparent, color: columnTextColors[column.id]}}>+</button>
                    </div>
                    <div className="column-body"> 
                        {getJobsForColumn(column.id).length === 0 ? (
                            <div className ="empty-state">
                                <div className="empty-state-icon">📝</div>
                                No jobs yet.<br />
                                Click the + button to add jobs!
                            </div>  
                        ): (
                            getJobsForColumn(column.id).map(job => (<JobCard key={job.id} job={job} jobs={jobs} setJobs={setJobs} onEdit={handleEditJob}/>))
                        )}
                    </div>
                             
                </div>
                );
                })}
                <AddJobModel 
                    isOpen={isAddModalOpen}
                    onClose={handleCloseAddModal}
                    onSave={handleSaveJob}
                    onEdit = {handleSaveJob}
                    columnType={currentColumn}
                    currentJob={jobToEdit}
                />
            </div>
        </>
    )
}

export default Column;