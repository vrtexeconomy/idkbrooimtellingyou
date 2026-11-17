const express = require('express');
const path = require('path');
const app = express();

// Allow the server to read JSON from the frontend
app.use(express.json());

// Serve your landing page from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Your Login API
app.post('/api/login', (req, res) => {
  const { admissionNumber, password } = req.body;

  // --- DUMMY DATA: Replace this with your database logic later ---
  if (admissionNumber === "20240123" && password === "password123") {
    return res.status(200).json({ success: true, message: "Welcome back!" });
  } else {
    return res.status(401).json({ success: false, message: "Invalid admission number or password." });
  }
});

// Render will assign a PORT, or fallback to 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
