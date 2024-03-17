const express = require('express')
const mongoose = require('mongoose')
const app = express()
const ejs = require('ejs')

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.set('view engine', 'ejs')

const port = 4001

app.listen(port, () => {
    console.log(`Render Server running at port ${port}`);
})


mongoose.connect("mongodb://localhost:27017/testDB")


const Schema = mongoose.Schema

const person = new Schema({
    _id: mongoose.Schema.Types.ObjectId, // You can use ObjectId for _id
    name: { type: String, required: true }, // Name is required and of type String
    absent: [{ type: String }] // Array of strings representing dates
});
const Attendance = mongoose.model("renderattendances", person)

app.use(express.urlencoded({ extended: true }));
// Middleware to parse form data


// to get data form db and render it onto the frontend
app.get("/downloadAttendance", (req, res) => {

    Attendance.find({})
        .then(students => {
            res.render('downloadAttendanceSheet', {
                studentList: students
            });
        })
        .catch(err => {
            // Handle error
            console.error(err);
            res.status(500).send("Internal Server Error");
        });

})

app.get('/downloadSheet.html', (req, res) => {
    res.sendFile(__dirname + '/downloadSheet.html');
});


// Route to handle form submission
app.post('/downloadAttendance', (req, res) => {
    const { date } = req.body;

    // Find records matching the provided date
    Attendance.find({ date: new Date(date) })
        .then(records => {
            res.render('downloadAttendanceSheet', { studentList: records });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

// route handler for searching the collection renderattendances using the unique id and removing it
app.post('/remove', (req, res) => {
    const { id } = req.body;
    Attendance.findByIdAndDelete(id)
        .then(deletedDocument => {
            if (!deletedDocument) {
                return res.status(404).send('Record not found');
            }
            console.log('Record removed:', deletedDocument);
            //res.status(200).send('Record removed successfully');
            res.redirect('/downloadAttendance');
        })
        .catch(err => {
            console.error('Error removing record:', err);
            res.status(500).send('Internal Server Error');
        });
});


