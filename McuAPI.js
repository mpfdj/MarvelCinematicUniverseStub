const express = require("express");
const fs = require("fs");

// ----------------------------------
// Initialize Express app
// ----------------------------------
const app = express();
app.use(express.json());


// ----------------------------------
// Load data when server starts
// ----------------------------------
const fileContent = fs.readFileSync("mcu.json", "utf8");
const mcu = JSON.parse(fileContent);


// ----------------------------------
// Some helper functions
// ----------------------------------
function updateFound(field) {
    return typeof field !== "undefined" && field !== "";
}

function updateFilm(current, updates) {
    let newFilm = { ...current };

    let phase = updates.phase;
    let title = updates.title;
    let release_year = updates.release_year;
    let release_date = updates.release_date;
    let director = updates.director;
    let notes = updates.notes;

    if (updateFound(phase)) newFilm.phase = phase;
    if (updateFound(title)) newFilm.title = title;
    if (updateFound(release_year)) newFilm.release_year = release_year;
    if (updateFound(release_date)) newFilm.release_date = release_date;
    if (updateFound(director)) newFilm.director = director;
    if (updateFound(notes)) newFilm.notes = notes;

    return newFilm;
}


// ----------------------------------
// Endpoints
// ----------------------------------
app.get("/mcu/films", (req, res) => {
    return res.status(200).json(mcu);
});


app.get("/mcu/films/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const film = mcu.find(film => film.id === id);
    if (!film) return res.sendStatus(404);
    return res.status(200).json(film);
});


app.post("/mcu/films/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const film = mcu.find(film => film.id === id);
    const index = mcu.findIndex(film => film.id === id);

    if (!film) return res.sendStatus(404);

    const updatedFilm = updateFilm(film, req.body);
    mcu[index] = updatedFilm;

    return res.status(200).json(updatedFilm);
});


app.delete("/mcu/films/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = mcu.findIndex(film => film.id === id);
    if (index === -1) return res.sendStatus(404);
    mcu.splice(index, 1);
    return res.sendStatus(200);
});


// ----------------------------------
// Start server
// ----------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GET endpoint: http://localhost:${PORT}/mcu/films`);
  console.log(`GET endpoint: http://localhost:${PORT}/mcu/films/:id`);
  console.log(`DELETE endpoint: http://localhost:${PORT}/mcu/films/:id`);
  console.log(`POST endpoint: http://localhost:${PORT}/mcu/films/:id`);
});
