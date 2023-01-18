// package
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
app.use('/profile', express.static(path.join(__dirname, '/profile')));

// multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profile');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.parse(file.originalname).name + path.extname(file.originalname));
    }
});

// multer docs
const profile = multer({ storage: storage });


app.get('/login', (req, res) => {
    res.sendFile(path.resolve('./views/login.html'));
})


app.get('/register', (req, res) => {
    res.sendFile(path.resolve('./views/register.html'));
})


app.post('/register', profile.single("Profile"), async (req, res) => {
    console.log(req.body.Password);
    
    var userVal = 0;

    if (await UserData.count({}) == 0) {
        userVal = 1;
    } else {
        let userId = await UserData.findOne().sort('-_id')
        userVal = userId.userId + 1;
    }

    
    const newUser = new UserData({
        userId: userVal,
        userName: req.body.Username,
        userType: req.body.UserType,
        email: req.body.Email,
        name: `${req.body.Firstname} ${req.body.Secondname}`,
        password: req.body.Password,
        mobile: req.body.Moblie,
        DOB: req.body.Dob,
        country: req.body.Country,
        state: req.body.State,
        city: req.body.City,
        gender: req.body.Gender,
        profilePicture: req.file.filename
    })

    
    if (await UserData.findOne({ userName: req.body.Username })) {
        res.cookie('RegisterError', 'Username is already exists ');
        res.redirect('/register');
    } else if (await UserData.findOne({ mobile: req.body.mobile })) {
        res.cookie('RegisterError', 'Mobile number is already exists ');
        res.redirect('/register');
    } else if (await UserData.findOne({ email: req.body.email })) {
        res.cookie('RegisterError', 'Email-id is already exists ');
        res.redirect('/register');
    } else {
        if (req.body.Password == req.body.ConformPassword) {
            
            newUser.save((err, result) => {
                if (err) {
                    console.log('error');
                } else {
                    console.log('Added');
                }
            })
            
            res.redirect('/login');
        } else {
            res.cookie('RegisterError', 'Password and conform password is not same');
            res.redirect('/register');
        }
    }


})


app.post('/login', async (req, res) => {
    console.log(req.body.loginpassword);
    // bcrypt password 
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.loginpassword, salt);
    
    const logUserEmail = await UserData.findOne({ email: req.body.loginuserdata });
    if (logUserEmail) {
        // check password
        if (await bcrypt.compare(logUserEmail.password, hashedPassword)) {
            
            if (logUserEmail.userType == 'Host') {

                res.cookie('userId', logUserEmail.userId)
                res.redirect('/host');
            } else {
                res.cookie('userId', logUserEmail.userId)
                res.redirect('/intro');
            }
        } else {
            res.cookie('logInError', 'Invalid password')
            res.redirect('/login');
        }
    } else {
        res.cookie('logInError', 'Invalid email address')
        res.redirect('/login');
    }


})


 
app.get('/registererror',async (req, res) => {
    const error = await req.cookies.RegisterError;
    if (await error == undefined) {
        res.json('')
    }else{
        res.clearCookie('RegisterError')
        res.json(error)
    }
})


app.get('/loginerror', async (req, res) => {
    const error = await req.cookies.logInError;
    if (await error == undefined) {
        res.json('')
    }else{
        res.clearCookie('logInError')
        res.json(error)
    }
})


app.get('/logout', (req, res) => {
    res.clearCookie('userId')
    res.clearCookie('propertyId')
    res.clearCookie('detailOfBooking')
    res.clearCookie('bookingError');
    res.clearCookie('bookingPropId');
    res.clearCookie('bookingId');
    res.clearCookie('logInError');
    res.clearCookie('RegisterError');
    res.redirect('/');
})

// module export here
module.exports = app;
