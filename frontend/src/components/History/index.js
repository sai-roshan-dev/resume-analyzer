/* --- File: frontend/src/components/History/index.js --- */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeTable from '../ResumeTable';
import TableFilters from '../TableFilters';
import ResumeModal from '../ResumeModal';
import DeleteConfirmation from '../DeleteConfirmation';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import Toast from '../Toast'; // Import Toast for notifications
import './index.css';

const API_URL = "http://localhost:5000/api/resumes";

const History = () => {
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedResume, setSelectedResume] = useState(null);
    const [toast, setToast] = useState({ message: '', type: '' });

    const fetchHistory = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get(API_URL);
            setHistory(response.data.data);
        } catch (err) {
            console.error('API Error:', err);
            setError('Failed to fetch resume history. Please check your backend server.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleFilterChange = (filters) => {
        // We'll implement this later to filter the history
        console.log('Filters changed:', filters);
    };

    const handleViewDetails = (resume) => {
        setSelectedResume(resume);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedResume(null);
    };

    const handleDeleteClick = (resume) => {
        setSelectedResume(resume);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`${API_URL}/${selectedResume._id}`);
            await fetchHistory(); // Re-fetch history to update the table
            setIsDeleteModalOpen(false);
            setSelectedResume(null);
            setToast({ message: 'Resume deleted successfully.', type: 'success' });
        } catch (err) {
            console.error('Delete API Error:', err);
            setToast({ message: 'Failed to delete resume. Please try again.', type: 'error' });
            setIsDeleteModalOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedResume(null);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="history-wrapper">
            <div className="main-content">
                <h2 className="history-header">Analysis History</h2>
                <TableFilters onFilterChange={handleFilterChange} />
                {isLoading ? (
                    <LoadingSpinner />
                ) : error ? (
                    <ErrorMessage message={error} />
                ) : history.length > 0 ? (
                    <ResumeTable 
                        resumes={history} 
                        onViewDetails={handleViewDetails}
                        onDelete={handleDeleteClick}
                    />
                ) : (
                    <p className="no-history-message">No previous analyses found. Upload a resume to get started!</p>
                )}
            </div>
            <ResumeModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                resumeData={selectedResume}
            />
            <DeleteConfirmation
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                fileName={selectedResume?.fileName}
            />
            <Toast message={toast.message} type={toast.type} />
        </div>
    );
};

export default History;
