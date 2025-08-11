const mockAnalysis = (resumeText) => {
    // For now, just return a simple, fixed analysis.
    return {
        resumeRating: Math.floor(Math.random() * 10) + 1, // Random rating 1-10
        improvementAreas: "This is a mock analysis. To improve, focus on quantifying your achievements and using more active verbs.",
        upskillSuggestions: ["Project Management", "Data Structures", "Cloud Computing"],
        strengthsIdentified: ["Strong communication skills", "Proven leadership"],
        recommendedJobRoles: ["Software Engineer", "Project Manager"]
    };
};

module.exports = {
    mockAnalysis
};