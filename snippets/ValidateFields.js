updates = {
            "id-nof-found": 1,
            "phase": "Phase One",
            "title": "Iron Man",
            "release_year": 2008,
            "release_date": "2008-05-02",
            "director": "Jon Favreau",
            "notes": "Post-credits scene introduces Nick Fury and the Avengers Initiative."
        };

const fields = Object.keys(updates);

const validFields = ["id", "phase", "title", "release_year", "release_date", "director", "notes"];
const invalidFields = validateFields(validFields, fields)

if (invalidFields) {
    console.log("invalid fields found: " + invalidFields);
}



function validateFields(validFields, fields) {
    const invalidFields = fields.filter(field => !validFields.includes(field));
    return invalidFields.join(", ");
}