// server.js

// ==================== BASIC SERVER SETUP ====================== //
// ============================================================== //

// Packages needed
const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors')
const compression = require('compression')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
var app = express()
require('dotenv').config()

// Setting up port used
const port = process.env.PORT || 8008

// Includes routing
const module_ = require('./module/index')

// All middleware configurations goes here
/* Use express static */

/* Use serve static to serve html page */
// app.use('/core', serveStatic('core', { 'index': ['index.html', 'index.htm'] }))
app.use('/', serveStatic('./modules/public', { 'index': ['index.html', 'index.htm'] }))
/* Configuration of the body-parser to get data from POST requests */
app.use(bodyParser.json({ limit: '4mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '4mb', extended: true }))
app.use(cors())
app.use(compression())

// ================== ROUTES FOR API REQUESTS =================== //
// ============================================================== //

/* app.get('/', function (req,res) {
	res.status(200).json({
		message: 'server OK'
	})
}) */

// Register services
app.use('/module', module_)

// ====================== SERVER STARTER ======================== //
// ============================================================== //

// Listening server
app.listen(port, '0.0.0.0', () => {
	console.log(`Pandaya Modules Repository has started on port ${port}`)
})

// Export our app for another purposes
module.exports = app
