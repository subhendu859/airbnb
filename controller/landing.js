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


app.get('/', (req, res) => {
    res.clearCookie('propertyId')
    res.sendFile(path.resolve('./views/index.html'))
})


app.get('/log', async (req, res) => {

    if (await req.cookies.userId == undefined) {
        const logdata = ['Register', 'Login']
        res.json(logdata)
    } else if (req.cookies.userId) {
        const logdata = ['Logout']
        res.json(logdata)
    }
})


app.get('/fetch', (req, res) => {

    PropertyData.find({}, (err, docs) => {
        if (docs) {
            res.json(docs);

        } else {
            console.log(err);
        }
    }).limit(40)
})

// export module here
module.exports = app;
