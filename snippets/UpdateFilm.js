var mcu = [
             {
               "id": 1,
               "phase": "Phase One",
               "title": "Iron Man",
               "release_year": 2008,
               "release_date": "2008-05-02",
               "director": "Jon Favreau",
               "notes": "Post-credits scene introduces Nick Fury and the Avengers Initiative."
             },
             {
               "id": 2,
               "phase": "Phase One",
               "title": "The Incredible Hulk",
               "release_year": 2008,
               "release_date": "2008-06-13",
               "director": "Louis Leterrier",
               "notes": "Starring Edward Norton as Bruce Banner. Tony Stark cameo in post-credits."
             },
             {
               "id": 3,
               "phase": "Phase One",
               "title": "Iron Man 2",
               "release_year": 2010,
               "release_date": "2010-05-07",
               "director": "Jon Favreau",
               "notes": "Introduces Black Widow. Post-credits shows Mjolnir in New Mexico."
             }
            ];


const updates = {
                    "phase": "Phase One UPDATED"
                };


const id = 3;
const film3 = mcu.find(film => film.id === id);
const index = mcu.findIndex(film => film.id === id);

if (!film3) {
    console.log("NOT FOUND");
    process.exit(1);
}



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



const updatedFilm = updateFilm(film3, updates);
mcu[index] = updatedFilm;

console.log(mcu);


