// import React, { useState } from 'react';
// import axios from 'axios';

// const ResumeForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     linkedin: '',
//     skills: '',
//     experience: '',
//     education: '',
//     includeSummary: false,
//   });

//   const [resume, setResume] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const formattedData = {
//         ...formData,
//         skills: formData.skills.split(',').map(skill => skill.trim()),
//         experience: JSON.parse(formData.experience),
//         education: JSON.parse(formData.education),
//       };

//       const response = await axios.post('http://localhost:5000/api/resume/generate', formattedData);
//       setResume(response.data.resume);
//     } catch (err) {
//       setError('Failed to generate resume. Please check your inputs.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="resume-form-container">
//       <h1>Resume Generator</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>LinkedIn Profile:</label>
//           <input
//             type="text"
//             name="linkedin"
//             value={formData.linkedin}
//             onChange={handleChange}
//           />
//         </div>
//         <div>
//           <label>Skills (comma-separated):</label>
//           <input
//             type="text"
//             name="skills"
//             value={formData.skills}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Experience (JSON format):</label>
//           <textarea
//             name="experience"
//             value={formData.experience}
//             onChange={handleChange}
//             rows="4"
//             required
//           />
//           <small>Example: [{"title" : "Developer", "company": "ABC Corp", "description": ["Developed features"]}]</small>
//         </div>
//         <div>
//           <label>Education (JSON format):</label>
//           <textarea
//             name="education"
//             value={formData.education}
//             onChange={handleChange}
//             rows="4"
//             required
//           />
//           <small>Example: [{"degree" : "BSc CS", "university": "XYZ University", "dates": "2015-2019"}]</small>
//         </div>
//         <div>
//           <label>
//             Include Summary:
//             <input
//               type="checkbox"
//               name="includeSummary"
//               checked={formData.includeSummary}
//               onChange={handleChange}
//             />
//           </label>
//         </div>
//         <button type="submit" disabled={loading}>
//           {loading ? 'Generating...' : 'Generate Resume'}
//         </button>
//       </form>

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {resume && (
//         <div>
//           <h2>Generated Resume</h2>
//           <pre>{resume}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResumeForm;
