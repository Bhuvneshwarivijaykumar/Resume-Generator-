import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    github: '',
    linkedin: '',
    portfolio: '',
    education: [],
    internships: [],
    projects: [],
    certifications: [],
    achievements: [],
    skills: [],
  });

  const [resumeText, setResumeText] = useState('');

  // Handle changes for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle adding a new education entry
  const handleAddEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institution: '', degree: '', cgpa: '', duration: '' },
      ],
    });
  };

  // Handle changes in education
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData({
      ...formData,
      education: updatedEducation,
    });
  };

  // Handle adding a new internship entry
  const handleAddInternship = () => {
    setFormData({
      ...formData,
      internships: [
        ...formData.internships,
        { title: '', organization: '', duration: '', description: '' },
      ],
    });
  };

  // Handle changes in internships
  const handleInternshipChange = (index, field, value) => {
    const updatedInternships = [...formData.internships];
    updatedInternships[index][field] = value;
    setFormData({
      ...formData,
      internships: updatedInternships,
    });
  };

  // Handle adding a new project entry
  const handleAddProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: '', description: '', techStack: '', outcome: '' },
      ],
    });
  };

  // Handle changes in projects
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index][field] = value;
    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  // Handle adding a new certification entry
  const handleAddCertification = () => {
    setFormData({
      ...formData,
      certifications: [
        ...formData.certifications,
        { title: '', organization: '', date: '' },
      ],
    });
  };

  // Handle changes in certifications
  const handleCertificationChange = (index, field, value) => {
    const updatedCertifications = [...formData.certifications];
    updatedCertifications[index][field] = value;
    setFormData({
      ...formData,
      certifications: updatedCertifications,
    });
  };

  // Handle adding a new achievement entry
  const handleAddAchievement = () => {
    setFormData({
      ...formData,
      achievements: [
        ...formData.achievements,
        { title: '', description: '' },
      ],
    });
  };

  // Handle changes in achievements
  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index][field] = value;
    setFormData({
      ...formData,
      achievements: updatedAchievements,
    });
  };

  // Handle adding a new skill
  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ''],
    });
  };

  // Handle changes in skills
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({
      ...formData,
      skills: updatedSkills,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/resume/generate', formData);
      setResumeText(response.data.resume);
    } catch (error) {
      console.error('Error generating resume:', error);
    }
  };

  // Download the resume as a PDF
  const downloadPdf = () => {
    const doc = new jsPDF();

    // Set font and size
    doc.setFont('helvetica');
    doc.setFontSize(12);

    // Add contact information
    doc.setFontSize(16);
    doc.text(formData.name, 10, 10);
    doc.setFontSize(12);
    doc.text(`Phone: ${formData.phone} | Email: ${formData.email}`, 10, 20);
    doc.text(`GitHub: ${formData.github} | LinkedIn: ${formData.linkedin} | Portfolio: ${formData.portfolio}`, 10, 30);

    // Add education
    doc.setFontSize(14);
    doc.text('EDUCATION', 10, 40);
    formData.education.forEach((edu, index) => {
      const y = 50 + index * 20;
      doc.text(`${edu.institution}`, 10, y);
      doc.text(`${edu.degree} | ${edu.cgpa} | ${edu.duration}`, 10, y + 10);
    });

    // Add internships
    doc.setFontSize(14);
    doc.text('INTERNSHIPS', 10, 100);
    formData.internships.forEach((internship, index) => {
      const y = 110 + index * 30;
      doc.text(`${internship.title}`, 10, y);
      doc.text(`${internship.organization} | ${internship.duration}`, 10, y + 10);
      doc.text(`${internship.description}`, 10, y + 20);
    });

    // Add projects
    doc.setFontSize(14);
    doc.text('PROJECTS', 10, 180);
    formData.projects.forEach((project, index) => {
      const y = 190 + index * 40;
      doc.text(`${project.title}`, 10, y);
      doc.text(`${project.description}`, 10, y + 10);
      doc.text(`Tech Stack: ${project.techStack}`, 10, y + 20);
      doc.text(`Outcome: ${project.outcome}`, 10, y + 30);
    });

    // Add certifications
    doc.setFontSize(14);
    doc.text('CERTIFICATIONS', 10, 280);
    formData.certifications.forEach((certification, index) => {
      const y = 290 + index * 20;
      doc.text(`${certification.title}`, 10, y);
      doc.text(`${certification.organization} | ${certification.date}`, 10, y + 10);
    });

    // Add achievements
    doc.setFontSize(14);
    doc.text('ACHIEVEMENTS', 10, 350);
    formData.achievements.forEach((achievement, index) => {
      const y = 360 + index * 20;
      doc.text(`${achievement.title}`, 10, y);
      doc.text(`${achievement.description}`, 10, y + 10);
    });

    // Add skills
    doc.setFontSize(14);
    doc.text('SKILLS', 10, 420);
    doc.text(`${formData.skills.join(', ')}`, 10, 430);

    // Save the PDF
    doc.save('resume.pdf');
  };

  return (
    <div className="container">
      <h1>Resume Generator</h1>
      <form onSubmit={handleSubmit} className="form">
        {/* Contact Information */}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>GitHub:</label>
          <input
            type="text"
            name="github"
            value={formData.github}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>LinkedIn:</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Portfolio:</label>
          <input
            type="text"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleChange}
          />
        </div>

        {/* Education */}
        <div className="form-group">
          <label>Education:</label>
          {formData.education.map((edu, index) => (
            <div key={index} className="education-input">
              <input
                type="text"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="CGPA/Percentage"
                value={edu.cgpa}
                onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Duration"
                value={edu.duration}
                onChange={(e) => handleEducationChange(index, 'duration', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddEducation} className="add-button">
            Add Education
          </button>
        </div>

        {/* Internships */}
        <div className="form-group">
          <label>Internships:</label>
          {formData.internships.map((internship, index) => (
            <div key={index} className="internship-input">
              <input
                type="text"
                placeholder="Title"
                value={internship.title}
                onChange={(e) => handleInternshipChange(index, 'title', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Organization"
                value={internship.organization}
                onChange={(e) => handleInternshipChange(index, 'organization', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Duration"
                value={internship.duration}
                onChange={(e) => handleInternshipChange(index, 'duration', e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={internship.description}
                onChange={(e) => handleInternshipChange(index, 'description', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddInternship} className="add-button">
            Add Internship
          </button>
        </div>

        {/* Projects */}
        <div className="form-group">
          <label>Projects:</label>
          {formData.projects.map((project, index) => (
            <div key={index} className="project-input">
              <input
                type="text"
                placeholder="Title"
                value={project.title}
                onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={project.description}
                onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Tech Stack"
                value={project.techStack}
                onChange={(e) => handleProjectChange(index, 'techStack', e.target.value)}
                required
              />
              <textarea
                placeholder="Outcome"
                value={project.outcome}
                onChange={(e) => handleProjectChange(index, 'outcome', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddProject} className="add-button">
            Add Project
          </button>
        </div>

        {/* Certifications */}
        <div className="form-group">
          <label>Certifications:</label>
          {formData.certifications.map((certification, index) => (
            <div key={index} className="certification-input">
              <input
                type="text"
                placeholder="Title"
                value={certification.title}
                onChange={(e) => handleCertificationChange(index, 'title', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Organization"
                value={certification.organization}
                onChange={(e) => handleCertificationChange(index, 'organization', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Date"
                value={certification.date}
                onChange={(e) => handleCertificationChange(index, 'date', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddCertification} className="add-button">
            Add Certification
          </button>
        </div>

        {/* Achievements */}
        <div className="form-group">
          <label>Achievements:</label>
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="achievement-input">
              <input
                type="text"
                placeholder="Title"
                value={achievement.title}
                onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={achievement.description}
                onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddAchievement} className="add-button">
            Add Achievement
          </button>
        </div>

        {/* Skills */}
        <div className="form-group">
          <label>Skills:</label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="skill-input">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" onClick={handleAddSkill} className="add-button">
            Add Skill
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Generate Resume</button>
      </form>

      {/* Display Generated Resume */}
      {resumeText && (
        <div className="resume-preview">
          <h2>Generated Resume</h2>
          <pre>{resumeText}</pre>
          <button onClick={downloadPdf} className="download-button">Download as PDF</button>
        </div>
      )}
    </div>
  );
};

export default App;