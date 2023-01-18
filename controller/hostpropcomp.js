// require
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const { UserData, PropertyData, BookingData, ContactData} = require('../schema/schema.js');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(`views`))

app.use(cookieParser());


app.get('/hostproperty/:id', async (req, res) => {
    if (req.cookies.propertyId) {
        res.clearCookie('propertyId')
    }
    
    res.cookie('propertyId', req.params.id);
    res.sendFile(path.resolve('./views/hostproperty.html'));
})


app.get('/propertydata', async (req, res) => {
    PropertyData.findOne({ propertyId: req.cookies.propertyId }, (err, docs) => {
        if (docs) {
            res.json(docs)

        } else {
            console.log(err);
        }
    })
})

// export modeule here
module.exports =app;
