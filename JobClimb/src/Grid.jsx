import React, {useState} from "react";
import JobCard2 from "./JobCard2.jsx";
import AddJobModel from "./AddJobModel";
import './Grid.css';

function Grid() {
    // State management
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentColumn, setCurrentColumn] = useState('');
    const [draggedJob, setDraggedJob] = useState(null);

    // Column configuration
    const columns = [
        { id: 'to-apply', title: 'To Apply' },
        { id: 'in-progress', title: 'In Progress' },
        { id: 'offers-received', title: 'Offers Received' }
    ];

    // Modal handlers
    const handleAddJob = (column) => {
        setCurrentColumn(column);
        setIsModalOpen(true);
    };

    const handleSaveJob = (newJob) => {
        setJobs([...jobs, newJob]);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentColumn('');
    };

    // Drag and drop handlers
    const handleDragStart = (e, job) => {
        setDraggedJob(job);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e, targetColumn) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        
        if (draggedJob && draggedJob.status !== targetColumn) {
            setJobs(jobs.map(job => 
                job.id === draggedJob.id 
                    ? { ...job, status: targetColumn }
                    : job
            ));
        }
        setDraggedJob(null);
    };

    // Utility function to get jobs for a specific column
    const getJobsForColumn = (columnId) => {
        return jobs.filter(job => job.status === columnId);
    };


    return(
        <div className="grid-container">
            {columns.map(column => (
                <div key={column.id} className="grid-column">
                    <div className="column-header">
                        <span className="column-title">{column.title}</span>
                        <button
                            className="add-job-btn"
                            onClick={() => handleAddJob(column.id)}
                            title={`Add job to ${column.title}`}
                        >
                            +
                        </button>
                    </div>
                    
                    <div 
                        className="column-body"
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, column.id)}
                    >
                        {getJobsForColumn(column.id).length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">📝</div>
                                No jobs yet.<br />
                                Click the + button to add one!
                            </div>
                        ) : (
                            getJobsForColumn(column.id).map(job => (
                                <JobCard2 
                                    key={job.id} 
                                    job={job} 
                                    onDragStart={handleDragStart}
                                />
                            ))
                        )}
                    </div>
                </div>
            ))}

            <AddJobModel
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveJob}
                columnType={currentColumn}
            />
        </div>
    );
}

export default Grid;