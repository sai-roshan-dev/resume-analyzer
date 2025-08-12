/* --- File: backend/services/analysisService.js --- */
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const getAIAnalysis = async (resumeText) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // The updated prompt now asks for both the extractedData and aiAnalysis objects.
        const prompt = `
            Please analyze the following resume text and provide a single, valid JSON response.
            The response must contain two main objects: "extractedData" and "aiAnalysis".
            
            1.  "extractedData": An object with the following fields extracted from the resume.
                - "name": String,
                - "email": String,
                - "phone": String,
                - "linkedinUrl": String (or null if not found),
                - "portfolioUrl": String (or null if not found),
                - "summary": String,
                - "workExperience": An array of objects, each with "role", "company", "duration", and a "description" array of strings. This array should not be empty if experience is present.
                - "education": An array of objects, each with "degree", "institution", and "graduationYear". This array should not be empty if education is present.
                - "technicalSkills": An array of strings,
                - "softSkills": An array of strings,
                - "projects": An array of objects, each with "name", "description", and a "technologies" array of strings.
            
            2.  "aiAnalysis": An object with the following fields:
                - "resumeRating": A numeric rating out of 10.
                - "improvementAreas": A string of concise suggestions for improvement.
                - "upskillSuggestions": An array of strings.
                - "strengthsIdentified": An array of strings.
                - "recommendedJobRoles": An array of strings.

            Ensure the JSON is well-formed and does not contain any extra text, markdown, or comments outside of the JSON object itself.

            Resume Text to Analyze:
            """
            ${resumeText}
            """
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('Gemini raw response:', text);

        // Robust parsing to handle potential markdown in the response
        let jsonString = text.trim();
        // Remove markdown code block fences if they exist
        if (jsonString.startsWith('```json')) {
          jsonString = jsonString.substring(7);
        }
        if (jsonString.endsWith('```')) {
          jsonString = jsonString.substring(0, jsonString.length - 3);
        }

        // Try to parse the JSON. This is the most robust part of the fix.
        try {
            return JSON.parse(jsonString);
        } catch (parseError) {
            console.error('Failed to parse JSON string:', parseError);
            console.error('Corrupted JSON string:', jsonString);
            return {
                extractedData: {},
                aiAnalysis: {
                    resumeRating: 0,
                    improvementAreas: "JSON parsing failed. Data may be incomplete.",
                    upskillSuggestions: [],
                    strengthsIdentified: [],
                    recommendedJobRoles: []
                }
            };
        }
    } catch (error) {
        console.error('Error with Gemini API:', error);
        return {
            extractedData: {},
            aiAnalysis: {
                resumeRating: 0,
                improvementAreas: "Failed to analyze resume. Please try again.",
                upskillSuggestions: [],
                strengthsIdentified: [],
                recommendedJobRoles: []
            }
        };
    }
};

module.exports = {
    getAIAnalysis,
};
