## About 


This project is an attendance system built using Node.js, Express.js, MongoDB, and other technologies. It provides a simple yet efficient way to track absentees for various events, classes, or meetings.


# Tech stack used


1) Node.js: A JavaScript runtime for building server-side applications.
3) Express.js: A web application framework for Node.js used for building web applications and APIs.
4) MongoDB: A NoSQL database used for storing attendance records.
5) Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
6) EJS: A simple templating language that lets you generate HTML markup with plain JavaScript.
7) Cors: Cross-Origin Resource Sharing middleware for Express.js.
8) XLSX: A library for reading, writing, and manipulating Excel files.


---


## Operations performed

- Add students to database
- Uses current date as absentee date
- Remove students from the database 
- Downloads the absentees table as an excel sheet
- Filters absentees based on the input date

---


## Important!!

- Here is the list of dependencies needed along with their versions:

1) cors: v2.8.5
2) ejs: v3.1.9
3) express: v4.18.2
4) mongoose: v8.2.1
5) xlsx: v0.18.5


- Run the following line to isntall all the above dependencies...

`npm install cors@^2.8.5 ejs@^3.1.9 express@^4.18.2 mongoose@^8.2.1 xlsx@^0.18.5 --save`

- Bootstrap is not required to be installed, it is accessed using the CDN using the link tag

---

- Run `run.bat` to start the project (CHROME IS REQUIRED), it automatically opens chrome, to terminate the project, close both the terminals that are running.

- Main server (`server.js`) runs on port 4000

- Secondary server (`renderAttendanceServer.js`) that renders the absentees table runs on port 4001

- In `styles.css`, the font-face "src" attribute should have the value: url(./font/NotoSans-VariableFont_wdth\,wght.ttf);
note the COMMA after the '\'

- The filter option by default is set to empty, mark the date in order to access the absentees of that date 
