// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for films
let films = [
  {
    "id": 22,
    "phase": "Phase Three",
    "title": "Avengers: Endgame",
    "release_year": 2019,
    "release_date": "2019-04-26",
    "director": "Anthony & Joe Russo",
    "notes": "Conclusion of the Infinity Saga. Features time travel and the final battle against Thanos."
  }
  // ... other films
];

// POST endpoint to update a film (all fields optional except ID validation)
app.post('/mcu/films/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  // Validate the ID in URL matches the ID in body (if provided)
  if (updates.id && id !== updates.id) {
    return res.status(400).json({
      error: 'Film ID in URL does not match ID in request body'
    });
  }

  // Find the index of the film to update
  const filmIndex = films.findIndex(f => f.id === id);

  if (filmIndex === -1) {
    return res.status(404).json({ error: 'Film not found' });
  }

  // Optional field validation - check if any provided field is valid
  const validFields = ['phase', 'title', 'release_year', 'release_date', 'director', 'notes', 'id'];
  const providedFields = Object.keys(updates);

  // Check for invalid fields
  const invalidFields = providedFields.filter(field => !validFields.includes(field));
  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: `Invalid field(s) provided: ${invalidFields.join(', ')}`,
      validFields: validFields
    });
  }

  // Type validation for specific fields (if provided)
  if (updates.release_year && typeof updates.release_year !== 'number') {
    return res.status(400).json({
      error: 'release_year must be a number'
    });
  }

  if (updates.release_date && !/^\d{4}-\d{2}-\d{2}$/.test(updates.release_date)) {
    return res.status(400).json({
      error: 'release_date must be in YYYY-MM-DD format'
    });
  }

  // Update the film - only apply provided fields
  const updatedFilm = {
    ...films[filmIndex], // Keep existing values
    ...updates,         // Override with provided updates
    id: id             // Ensure ID stays the same
  };

  films[filmIndex] = updatedFilm;

  res.json({
    message: 'Film updated successfully',
    film: updatedFilm,
    updatedFields: providedFields.filter(f => f !== 'id')
  });
});

// Alternative: PATCH endpoint for partial updates (more semantic)
app.patch('/mcu/films/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  // Don't allow updating the ID via PATCH
  if (updates.id && updates.id !== id) {
    return res.status(400).json({
      error: 'Cannot change film ID'
    });
  }

  const filmIndex = films.findIndex(f => f.id === id);

  if (filmIndex === -1) {
    return res.status(404).json({ error: 'Film not found' });
  }

  // Remove ID from updates if present since we won't change it
  const { id: updateId, ...updatesWithoutId } = updates;

  // Merge updates with existing film
  const updatedFilm = {
    ...films[filmIndex],
    ...updatesWithoutId
  };

  films[filmIndex] = updatedFilm;

  res.json({
    message: 'Film partially updated successfully',
    film: updatedFilm,
    updatedFields: Object.keys(updatesWithoutId)
  });
});

// PUT endpoint for complete replacement (requires all fields)
app.put('/mcu/films/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const newFilmData = req.body;

  // Ensure ID in body matches URL parameter (if provided)
  if (newFilmData.id && newFilmData.id !== id) {
    return res.status(400).json({
      error: 'Film ID in URL does not match ID in request body'
    });
  }

  // For PUT, require all fields (except id which comes from URL)
  const requiredFields = ['phase', 'title', 'release_year', 'release_date', 'director', 'notes'];
  const missingFields = requiredFields.filter(field => !newFilmData[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields for PUT: ${missingFields.join(', ')}`
    });
  }

  // Type validation
  if (typeof newFilmData.release_year !== 'number') {
    return res.status(400).json({
      error: 'release_year must be a number'
    });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(newFilmData.release_date)) {
    return res.status(400).json({
      error: 'release_date must be in YYYY-MM-DD format'
    });
  }

  const filmIndex = films.findIndex(f => f.id === id);

  if (filmIndex === -1) {
    // Create new film if it doesn't exist
    films.push({
      ...newFilmData,
      id: id
    });
    return res.status(201).json({
      message: 'Film created successfully',
      film: films[films.length - 1]
    });
  }

  // Replace the entire film
  films[filmIndex] = {
    ...newFilmData,
    id: id
  };

  res.json({
    message: 'Film replaced successfully',
    film: films[filmIndex]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`POST endpoint: http://localhost:${PORT}/mcu/films/:id`);
  console.log(`PATCH endpoint: http://localhost:${PORT}/mcu/films/:id`);
  console.log(`PUT endpoint: http://localhost:${PORT}/mcu/films/:id`);
});

module.exports = app;