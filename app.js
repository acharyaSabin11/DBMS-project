"use strict";

//Package Imports:
const http = require('http');   //for handling http requests and response
require('dotenv').config();     //for working with .env file
const fs = require('fs');       //for working with the files in the filesystem.
const pg = require('pg');   //for elephant sql database connection.
const { constants } = require('buffer');

//Setup constants declaration.
const port = process.env.HOST_PORT;
const hostIP = process.env.HOST_IP;

//Setup html files path to be sent by server.
const indexHtmlPath = __dirname + "/frontend/html/index.html";
const cssPath = __dirname + '/frontend/css/style.css';
const scriptPath = __dirname + '/frontend/js/script.js'
const logoPath = __dirname + '/frontend/images/logo.png'

//Reading the files synchronously
let htmlContent = '';
let cssContent = '';
let scriptContent = '';
let logoImageContent = '';
try {
    htmlContent = fs.readFileSync(indexHtmlPath);
    cssContent = fs.readFileSync(cssPath);
    scriptContent = fs.readFileSync(scriptPath);
    logoImageContent = fs.readFileSync(logoPath);
} catch (e) {
    console.log(`Error reading file: ${e}`);
}

//Database setup
var pgClient = new pg.Client(process.env.DB_URL);   //creating client for database
//Establishing connection with the database.
pgClient.connect((err) => {
    if (err) {
        console.log(`Error connecting to database: ${err}`);
    } else {
        console.log('Connected to Database Successfully');
        //Creating table if there is no table
        const createTableQuery = 'CREATE TABLE IF NOT EXISTS tbl_students (roll VARCHAR(50) PRIMARY KEY, name VARCHAR(50), dob DATE, gender VARCHAR(50), height INT);';
        pgClient.query(createTableQuery, (err, ret) => {
            if (err) {
                console.log(`Error creating table: ${err}`);
            } else {
                console.log('tbl_students READY');
            }
        });
    }
});

//Server creation and request handeling here.
const server = http.createServer((req, res) => {

    //Handling GET requests:
    if (req.method === 'GET') {
        //handling request for root
        if (req.url === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': htmlContent.length,
                'Expires': new Date().toUTCString
            });
            res.write(htmlContent);
        }
        //if css file is requested
        else if (req.url === '/css/style.css') {
            res.writeHead(200, {
                'Content-Type': 'text/css',
                'Content-Length': cssContent.length,
                'Expires': new Date().toUTCString
            });
            res.write(cssContent);
        }
        //if javascript file is requested
        else if (req.url === '/js/script.js') {
            res.writeHead(200, {
                'Content-Type': 'text/script',
                'Content-Length': scriptContent.length,
                'Expires': new Date().toUTCString
            });
            res.write(scriptContent);
        }
        //if logo file is requested
        else if (req.url === '/images/logo.png') {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': logoImageContent.length,
                'Expires': new Date().toUTCString
            });
            res.write(logoImageContent);
        } //if background image file is requested
        else if (req.url === '/images/background.jpg') {
            const backgroundImagePath = __dirname + "/frontend/images/background.jpg";
            let backgroundImageContent = "";
            try {
                backgroundImageContent = fs.readFileSync(backgroundImagePath);
            } catch (e) {
                console.log(`Error opening background Image: ${e}`);
            }
            res.writeHead(200, {
                'Content-Type': 'image/jpg',
                'Content-Length': backgroundImageContent.length,
                'Expires': new Date().toUTCString
            });
            res.write(backgroundImageContent);
            //if any of the url that is not implemented is requested.
        } else {
            console.log('Some unknown GET path is being requested!')
            console.log(`Path being requested: ${req.url}`);
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.write('Sorry this path could not be found');
        }
        res.end()
    } else if (req.method === 'POST') {
        if (req.url === '/submit-form') {
            //TODO: Add the logic to add data to the database
            let incomingBody = '';
            let jsonBody;
            let formSubmitQuery;
            req.on('data', (chunk) => {
                incomingBody += chunk;
            })
            req.on('end', () => {
                jsonBody = JSON.parse(incomingBody);
                formSubmitQuery = `INSERT INTO tbl_students (roll, name, dob, gender, height) VALUES ('${jsonBody.roll}', '${jsonBody.name}', '${jsonBody.dob}', '${jsonBody.gender}', ${jsonBody.height});`;
                pgClient.query(formSubmitQuery, (err, _) => {
                    if (err) {
                        console.log(`Error inserting data into the table: ${err}`);
                    }
                    else {
                        console.log('Insert Successful');
                        console.log(`Query: ${formSubmitQuery}`);
                    }
                });
            });
        }
    }

});

//Listening constantly for the request at provided ip and port.
server.listen(port, hostIP, () => {
    console.log(`Server started at: http://${hostIP}:${port}/`);
});