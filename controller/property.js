// require
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const { UserData, PropertyData, BookingData, RatingData, ContactData } = require('../schema/schema.js');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(`views`))

app.use(cookieParser());


app.get('/property/:id', async (req, res) => {
    if (req.cookies._id) {
        res.clearCookie('_id')
    }
    res.cookie('_id', req.params.id);
    res.sendFile(path.resolve('./views/product.html'))
})


app.get('/propertydata', async (req, res) => {
    PropertyData.findOne({ _id: req.cookies._id }, (err, docs) => {
        if (docs) {
            res.json(docs)

        } else {
            console.log(err);
        }
    })
})

//property review 
app.get('/propertyreview', async (req, res) => {
    RatingData.find({ propertyId: req.cookies._id }, (err, docs) => {
        if (docs) {
            console.log(docs);
            res.json(docs)

        } else {
            console.log(err);
        }
    })
})

// property rating
app.get('/propertyrating', async (req, res) => {
    const ratingData = await RatingData.find({ propertyId: req.cookies._id });
    var ratings = 0;

    for (let i = 0; i < ratingData.length; i++) {
        ratings += ratingData[i].rating;
    }
    const propRating = ratings / (ratingData.length);
    res.json(propRating);
})

//booking error 
app.get('/bookingerror', (req, res) => {
    if (req.cookies.bookingError) {
        const error = req.cookies.bookingError;
        res.clearCookie('bookingError')
        console.log(error);
        res.json(error)
    }
})


app.post('/property/booking', async (req, res) => {
    console.log(11);
    const property = await PropertyData.findOne({ propertyId: req.cookies.propertyId });
    const userd = await UserData.findOne({ userId: req.cookies.userId });
    console.log(userd);

    if (await req.cookies.userId == undefined) {
        res.cookie('logInError', 'Need login before book a property')
        res.redirect('/login')


    } else {
        if (req.body.Nop <= property.noOfPeople) {
            const checkIn = req.body.CheckIn;
            const checkOut = req.body.CheckOut;
            const checkInDate = (new Date(req.body.CheckIn).getTime()) / (1000 * 60 * 60 * 24);
            const checkOutDate = (new Date(req.body.CheckOut).getTime()) / (1000 * 60 * 60 * 24);
            const numberOfPerson = req.body.Nop;
            const totalDays = (checkOutDate - checkInDate);
            const price = property.pricing;
            const guestName = userd.name;
            const totalPrice = property.pricing * totalDays;
            const propertySelectedId = req.cookies.propertyId;
            const propertyName = property.propertyName;

            const bookingDetails = [checkIn, checkOut, numberOfPerson, totalDays, price, totalPrice, propertySelectedId, propertyName]
            res.clearCookie('detailOfBooking');
            res.cookie('detailOfBooking', bookingDetails);
            res.redirect('/booking/conformation');
        } else {

            res.clearCookie('bookingError');
            res.cookie('bookingError', `Person no more then ${property.noOfPeople}`)
            res.redirect(`/property/${req.cookies.propertyId}`);
        }
    }

})

// module export
module.exports = app;
