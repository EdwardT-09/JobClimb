import React from 'react';
import './JobCard2.css';

function JobCard2({ job, onDragStart }) {
    return (
        <div 
            draggable
            onDragStart={(e) => onDragStart(e, job)}
            className="job-card"
        >
            <div className="job-card-title">
                {job.position}
            </div>
            <div className="job-card-detail">
                <strong>Company:</strong> {job.company}
            </div>
            <div className="job-card-detail">
                <strong>Location:</strong> {job.location}
            </div>
            <div className="job-card-detail">
                <strong>Salary:</strong> {job.salary}
            </div>
            <div className="job-card-date">
                <strong>Date:</strong> {job.date}
            </div>
            {job.notes && (
                <div className="job-card-notes">
                    {job.notes}
                </div>
            )}
        </div>
    );
}

export default JobCard2;