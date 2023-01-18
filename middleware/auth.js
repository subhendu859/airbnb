const jwt = require('jsonwebtoken');
const Users = require('../models/users');


const auth = async (req, res, next) => {
    try {
        token = req.cookies.jwt;
        const vefifyUser = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(vefifyUser);
        const Userdata = await Users.findOne({ _id: vefifyUser._id });
        //send data to router to acces there
        req.Userdata = Userdata;
        
        req.token = token;
        next();

    } catch (error) {
        //ask for log in if user not logged in
        res.status(401).render('bookingError');
    }
}

module.exports = auth;