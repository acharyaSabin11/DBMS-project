"use strict";

//Package Imports:
const http = require('http');   //for handling http requests and response
require('dotenv').config();     //for working with .env file
const fs = require('fs');       //for working with the files in the filesystem.

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
        }
    }

});

//Listening constantly for the request at provided ip and port.
server.listen(port, hostIP, () => {
    console.log(`Server started at: http://${hostIP}:${port}/`);
});