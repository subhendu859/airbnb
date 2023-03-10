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


app.get('/rating', async (req, res) => {
    if (await req.cookies.userId == undefined) {
        res.cookie('logInError', 'Need login')
        res.redirect('/login')
    } else {
        res.sendFile(path.resolve('./views/ratings.html'));
    }

})


app.post('/reviewdata', async (req, res) => {

    
    var ratingVal = 0;

    if (await RatingData.count({}) == 0) {
        ratingVal = 1;
    } else {
        let ratingId = await RatingData.findOne().sort('-_id')
        ratingVal = ratingId.ratingId + 1;
    }
    const date = new Date();

    // schema
    const newRating = new RatingData({
        ratingId: ratingVal,
        userId: req.cookies.userId,
        propertyId: req.cookies.bookingPropId,
        bookingId: req.cookies.bookingId,
        reviewDate: date,
        reviewHeading: req.body.reviewheading,
        reviewDescription: req.body.review,
        rating: req.body.rating,
    })

    // save 
    newRating.save((err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Added');
            console.log(result);
        }
    });
})

// module
module.exports = app;
