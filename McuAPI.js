const express = require("express");
const fs = require("fs");

// Initialize Express app
const app = express();
app.use(express.json());


// Load data ONCE when server starts
var mcu;

try {
    const fileContent = fs.readFileSync("mcu.json", "utf8");
    mcu = JSON.parse(fileContent);
    console.log("mcu.json loaded successfully on startup");
} catch (err) {
    console.error("Failed to load mcu.json on startup:", err);
    process.exit(1); // Exit if data can"t be loaded
}

//function validateFields(validFields, fields) {
//    const invalidFields = fields.filter(field => !validFields.includes(field));
//    return invalidFields.join(", ");
//}

function updateFound(field) {
    if (typeof field !== "undefined" && field !== "") return true;
    return false;
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


// Enable CORS for all routes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// GET
app.get("/mcu/films", (req, res) => {
    res.json(mcu); // Express automatically sets Content-Type to application/json
});


// POST
app.post("/mcu/films/:id", (req, res) => {
    const updates = req.body;
    const fields = Object.keys(updates);

//    const validFields = ["id", "phase", "title", "release_year", "release_date", "director", "notes"];
//    const invalidFields = validateFields(validFields, fields);
//
//    if (invalidFields) {
//        return res.status(400).json({
//          error: "invalid fields found: " + invalidFields
//        });
//    }

    const id = parseInt(req.params.id);
    const film = mcu.find(film => film.id === id);
    const index = mcu.findIndex(film => film.id === id);

    if (!film) {
        return res.status(404);
    }

    const updatedFilm = updateFilm(film, updates);
    mcu[index] = updatedFilm;

    res.json(updatedFilm);
});



// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GET endpoint: http://localhost:${PORT}/mcu/films`);
  console.log(`POST endpoint: http://localhost:${PORT}/mcu/films/:id`);
});
