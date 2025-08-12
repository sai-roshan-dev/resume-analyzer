/* --- File: frontend/src/components/AIAnalysis/index.js --- */
import React from 'react';
import './index.css';

const AIAnalysis = ({ analysis }) => {
    if (!analysis || !analysis.aiAnalysis) {
        return null;
    }

    const { upskillSuggestions, strengthsIdentified } = analysis.aiAnalysis;

    return (
        <div className="ai-analysis-section">
            <h4 className="analysis-title">Upskill Suggestions:</h4>
            {upskillSuggestions && upskillSuggestions.length > 0 ? (
                <ul className="suggestions-list">
                    {upskillSuggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                    ))}
                </ul>
            ) : (
                <p>No upskill suggestions provided.</p>
            )}

            <h4 className="analysis-title" style={{ marginTop: '1.5rem' }}>Strengths Identified:</h4>
            {strengthsIdentified && strengthsIdentified.length > 0 ? (
                <ul className="suggestions-list">
                    {strengthsIdentified.map((strength, index) => (
                        <li key={index}>{strength}</li>
                    ))}
                </ul>
            ) : (
                <p>No strengths identified.</p>
            )}
        </div>
    );
};

export default AIAnalysis;
