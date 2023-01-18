// Require packages 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')
const { UserData, PropertyData, BookingData, ContactData, RatingData } = require('./schema/schema');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');

const moongoURI = "mongodb+srv://Subhendu:Subhendu@cluster0.t1ajlhn.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

// middleware
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(`views`))
app.use(express.static(`views/style/style.css`))

app.use(cookieParser());
app.use('/profile', express.static(path.join(__dirname, '/profile')));

// add files
// login , register and logout
app.use(require('./controller/login&register.js'));

// landingpage
app.use(require('./controller/landing.js'));

// propertypage
app.use(require('./controller/property.js'));

// bookings page
app.use(require('./controller/booking.js'));

// booking conform
app.use(require('./controller/bookingconform.js'));

// check my booking
app.use(require('./controller/mybookings.js'));

// booking component
app.use(require('./controller/bookingcomp.js'));

// host page
app.use(require('./controller/host.js'));

// host property component
app.use(require('./controller/hostpropcomp.js'));

// host add property
app.use(require('./controller/hostaddprop.js'));

// rating and review
app.use(require('./controller/rating&review.js'));

// intro
app.get('/intro', async (req, res) => {

    res.sendFile('./views/intro.html', { root: __dirname })
})

// contact
app.get('/contact', async (req, res) => {
    if (await req.cookies.userId == undefined) {
        res.redirect('/login')
    }
    res.sendFile('./views/contact.html', { root: __dirname })
})

// query data
app.post('/contactquerydata', async (req, res) => {

    // create contact id here
    var contactVal = 0;

    if (await ContactData.count({}) == 0) {
        contactVal = 1;
    } else {
        let contactId = await ContactData.findOne().sort('-_id')
        contactVal = contactId.contactId + 1;
    }

    // connect with schema
    const newQuery = new ContactData({
        contactId: contactVal,
        email: req.body.Email,
        query: req.body.Query,
        name: req.body.Name,
        mobile: req.body.Phone,
    })

    // save query details
    newQuery.save((err, result) => {
        if (err) {
            console.log('error');
        } else {
            console.log('Added');
        }
    })
    // redirect to home
    res.redirect('/')
})

app.listen('3000', () => {
    console.log('Server started at port 3000');
})
