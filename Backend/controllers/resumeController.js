const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateResume = async (req, res) => {
  const {
    name,
    email,
    skills,
    experience,
    education,
    phoneNumber,
    linkedin,
    includeSummary,
  } = req.body;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `
You are an AI assistant designed to generate resume content. You will receive information about a candidate and output the content formatted for a standard resume.

**Instructions:**

1.  **Input Data:**  You will receive a JSON object containing the candidate's name, email, skills (as an array of strings),   (as an array of job objects), and education (as an array of education objects).

2.  **Output Format:**  Return a complete resume in a plain text format suitable for display or further processing.  Organize the resume into the following sections, in this order:

    *   **Contact Information:**  Name, Email.  Optionally include phone number and LinkedIn profile if provided in the input (add those fields to input).
    *   **Skills:**  A bulleted list of skills, each skill on its own line.
    *   **Experience:**  For each job in the 'experience' array, format as follows:
        *   **Title**
        *   **Company** | **Dates**
        *   A bulleted list of responsibilities and accomplishments (use the 'description' field from the job object to generate these bullets. If the 'description' field is a single string, convert it to a single bullet point.  If the 'description' field is an array, use each element as a bullet point).
    *   **Education:** For each education entry in the 'education' array, format as follows:
        *   **Degree**
        *   **University** | **Dates**

3.  **Formatting Details:**

    *   Use clear and concise language.
    *   Focus on accomplishments and quantifiable results whenever possible (you may need to rephrase descriptions if they are vague).  For example, change "Responsible for data analysis" to "Conducted data analysis resulting in X improvement".  If no metrics are available, focus on highlighting the impact of the task.
    *   Use action verbs at the beginning of each bullet point in the Experience section (e.g., "Developed," "Managed," "Analyzed").
    *   Maintain a professional tone.
    *   Do not include a summary or objective statement unless explicitly instructed in the input data (add a field to the input data to control this).
    *   **Do not add any introductory or concluding remarks.  Only output the resume content itself.**

**Input Data:**

${JSON.stringify({ name, email, skills, experience, education, phoneNumber, linkedin, includeSummary })}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const resumeText = response.text();

    console.log({ resumeText });
    res.status(200).json({ resume: resumeText });
  } catch (error) {
    console.error("Error generating resume:", error);
    res
      .status(500)
      .json({ error: "Failed to generate resume", details: error.message });
  }
};

module.exports = { generateResume };
