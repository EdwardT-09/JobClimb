import React, { useState } from 'react';
import './AddJobModel.css';

function AddJobModel({ isOpen, onClose, onSave, columnType }) {
    const [formData, setFormData] = useState({
        position: '',
        company: '',
        location: '',
        salary: '',
        date: '',
        notes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted with data:', formData);
        
        // Check if required fields are filled
        if (!formData.position.trim()) {
            alert('Please enter a job position');
            return;
        }
        if (!formData.company.trim()) {
            alert('Please enter a company name');
            return;
        }
        
        // Create new job with all data
        const newJob = {
            ...formData,
            id: Date.now(),
            status: columnType
        };
        
        console.log('Saving new job:', newJob);
        onSave(newJob);
        
        // Reset form
        setFormData({
            position: '',
            company: '',
            location: '',
            salary: '',
            date: '',
            notes: ''
        });
        onClose();
    };

    const handleClose = () => {
        setFormData({
            position: '',
            company: '',
            location: '',
            salary: '',
            date: '',
            notes: ''
        });
        onClose();
    };

    const handleInputChange = (field, value) => {
        setFormData({...formData, [field]: value});
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={handleClose}>
                    ×
                </button>

                <h2 className="modal-title">
                    Add Job Application Form
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">
                            JOB POSITION *
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.position}
                            onChange={(e) => handleInputChange('position', e.target.value)}
                            placeholder="Frontend Developer"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            COMPANY *
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            placeholder="Tech Company Inc."
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            LOCATION *
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                            placeholder="San Francisco, CA"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            SALARY *
                        </label>
                        <input
                            type="text"
                            className="form-input"
                            value={formData.salary}
                            onChange={(e) => handleInputChange('salary', e.target.value)}
                            placeholder="$80,000 - $100,000"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            DATE *
                        </label>
                        <input
                            type="date"
                            className="form-input"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            ADDITIONAL NOTES
                        </label>
                        <textarea
                            className="form-textarea"
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            placeholder="Any additional notes or comments..."
                            rows={3}
                        />
                    </div>

                    <button type="submit" className="form-submit-btn">
                        Add Job Application
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddJobModel;