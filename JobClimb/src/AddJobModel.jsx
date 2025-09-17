import { useState, useEffect } from 'react';
import './AddJobModel.css';

function AddJobModel({ isOpen, onClose, onSave, onEdit,  columnType, currentJob  }) {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        location: '',
        salary: '',
        startDate: '',
        notes: ''
    });

    useEffect(()=>{
        if(currentJob){
            setFormData({
                company: currentJob.company ||'',
                position: currentJob.position || '',
                location: currentJob.location || '',
                salary: currentJob.salary || '',
                startDate: currentJob.startDate || '',
                notes: currentJob.notes || "",
                id: currentJob.id
            })
        }
        else{
            setFormData({
                company: '',
                position: '',
                location: '',
                salary: '',
                startDate: '',
                notes: ''
            })
        }
    }, [currentJob])

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
        const jobData = {
            ...formData,
             id: currentJob ? currentJob.id : Date.now(),
            status: columnType
        };

        if(currentJob){
            onEdit(jobData);
        } else{
            onSave(jobData);
        }
        
        
        // Reset form
        setFormData({
            position: '',
            company: '',
            location: '',
            salary: '',
            startDate: '',
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
            startDate: '',
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
                            value={formData.startDate}
                            onChange={(e) => handleInputChange('startDate', e.target.value)}
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