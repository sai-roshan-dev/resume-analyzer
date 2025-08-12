/* --- File: frontend/src/components/ResumeOverview/index.js --- */
import React from 'react';
import './index.css';

const ResumeOverview = ({ analysis }) => {
    if (!analysis || !analysis.aiAnalysis) {
        return null;
    }
    
    // Check if the AI data exists before trying to destructure
    const aiAnalysis = analysis.aiAnalysis || {};
    const { resumeRating, improvementAreas } = aiAnalysis;
    const ratingColorClass = resumeRating > 7 ? 'rating-high' : 'rating-low';

    return (
        <div className="resume-overview-grid">
            <div className="overview-card">
                <h4 className="card-title">Rating:</h4>
                <p className={`card-content ${ratingColorClass}`}>
                    {/* Display a fallback value if resumeRating is not available */}
                    {resumeRating ? `${resumeRating}/10` : 'N/A'}
                </p>
            </div>
            <div className="overview-card">
                <h4 className="card-title">Summary:</h4>
                <p className="summary-content">
                    {improvementAreas || 'No summary available.'}
                </p>
            </div>
        </div>
    );
};

export default ResumeOverview;
