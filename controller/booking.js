// require
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const { UserData, PropertyData, BookingData, ContactData } = require('../schema/schema.js');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(`views`))

app.use(cookieParser());

// booking details
app.get('/bookingdetails', async (req, res) => {
    const bookingSendData = await req.cookies.detailOfBooking;
    res.json(bookingSendData);
})


app.get('/booking/conformation', async (req, res) => {
    res.sendFile(path.resolve('./views/conformation.html'))
})

// export module
module.exports = app;
