const express = require('express')
const mongoose = require('mongoose')
const app = express()
const ejs = require('ejs')
const cors = require('cors'); // Import cors middleware
var splitAbsentDates = require("./splitAbsentDates")

var bodyParser = require('body-parser');

// to properly parse the json received as input from the client
app.use(bodyParser.json());

app.use(cors())

app.set('view engine', 'ejs')

const port = 4000

app.listen(port, () => {
    console.log(`Main Server running at port ${port}`);
})

mongoose.connect("mongodb://localhost:27017/testDB")


const Schema = mongoose.Schema

const person = new Schema({
    _id: mongoose.Schema.Types.ObjectId, // You can use ObjectId for _id
    name: { type: String, required: true }, // Name is required and of type String
    absent: [{ type: String }] // Array of strings representing dates
});
const Test = mongoose.model("renderAttendance", person)

app.use(express.urlencoded({ extended: true }));

app.post("/submit", (req, res) => {
    // Logging to see if the request body is received
    console.log('Request body:', req.body);

    // Extract data from the request body
    const { name, absent } = req.body;

    // Check if the name field is provided
    if (!name) {
        return res.status(400).send('Name field is required');
    }
    // Call splitAbsentDates function to get array of JSONs
    const newTestDocuments = splitAbsentDates(req.body);

    // Create an array to hold promises for saving documents
    const savePromises = [];

    // Iterate over the array of JSONs and create new documents
    newTestDocuments.forEach(data => {
        const newTest = new Test({
            _id: new mongoose.Types.ObjectId(), // Generating a new ObjectId
            name: data.name,
            absent: data.absent // Assuming absent is an array of strings
        });
        // Save each document and push the promise to the array
        savePromises.push(newTest.save());
    });

    // Execute all save promises
    Promise.all(savePromises)
        .then(savedTests => {
            console.log(' Data saved to MongoDB:\n', savedTests);

            // res.redirect('/');
            res.status(200).json({ message: 'Data saved successfully' });
            // Redirect to the home page after successful submission
        })
        .catch(err => {
            console.error('Error saving test data to MongoDB:', err);
            // res.status(500).send("Internal Server Error");
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.get("/", (req, res) => {
    res.send("Welcome to the homepage");
    // You can also render a view here if you have an index.ejs file in your views directory
    // res.render("index");
});
// new folder should be called 'views'



