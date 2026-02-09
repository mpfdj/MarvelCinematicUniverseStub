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

var id = 3;
const index = mcu.findIndex(film => film.id === id);

if (index === -1) console.log("NOT FOUND");

mcu.splice(index, 1);

console.log(mcu);
