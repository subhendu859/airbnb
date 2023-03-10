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

// chech host 
app.get('/host', async (req, res) => {
    res.clearCookie('propertyId');
    const logUser = await UserData.findOne({ userId: req.cookies.userId });
    if (logUser.userType == 'Host') {
        res.sendFile(path.resolve('./views/host.html'));
    } else {
        res.clearCookie('userId')
        res.cookie('RegisterError', 'Register for host first');
        res.redirect('/register');
    }

})



app.get('/hostproperty', (req, res) => {
    PropertyData.find({ userId: req.cookies.userId }, (err, docs) => {
        if (docs) {
            res.json(docs)
        } else {
            console.log(err);
        }
    })

})

// module export here
module.exports = app;
