const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const resumeRoutes = require('./routes/resumeRoutes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/resume', resumeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});