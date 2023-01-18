const mongoose = require('mongoose')

const moongoURI = "mongodb+srv://Subhendu:Subhendu@cluster0.t1ajlhn.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

mongoose.connect(moongoURI)
    .then(res => {
        console.log("Connected to database");
    })
    .catch(err => {
        console.log("Not connected to database");
    })

const userData = new mongoose.Schema({
    userId: Number,
    userName: String,
    userType: String,
    email: String,
    name: String,
    password: String,
    mobile: Number,
    DOB: String,
    country: String,
    state: String,
    city: String,
    gender: String,
    profilePicture: String,
    Date: Number
})

const propertyData = new mongoose.Schema({
    _id: String,
    listing_url: String,
    name: String,
    price: Number,
    category: String,
    address: {
        street: String,
        suburb: String,
        government_area: String,
        market: String,
        country: String,
        country_code: String
    },
    images: {

        thumbnail_url: String,
        medium_url: String,
        picture_url: String,
        xl_picture_url: String
    },
    bedrooms: Number,
    summary: String,
    space: String,
    description: String,
    neighborhood_overview: String,
    notes: String,
    transit: String,
    access: String,
    interaction: String,
    house_rules: String,
    property_type: String,
    room_type: String,
    bed_type: String,
    minumum_nights: String,
    maximum_nights: String,
    cancellation_policy: String,
    first_review: Date,
    calendar_last_scraped: Date,
    last_scraped: Date,
    accommodates: Number,
    bedrooms: Number,
    beds: Number,
    number_of_reviews: Number,
    bathrooms: Number,
    amenities: Array,
    security_deposit: Number,
    cleaning_fee: Number,
    extra_people: Number,
    guests_included: Number,
    host: Object,
    address: Object,
    availability: Object,
    review_scores: Object,

    reviews: Array,
})

const bookingData = new mongoose.Schema({
    bookingId: Number,
    bookingDate: Number,
    bookingGuestId: Number,
    propertyId: Number,
    propertyName: String,
    guestName: String,
    checkIn: String,
    checkOut: String,
    totalPrice: Number,
    paymentMethod: String,
    noOfNights: Number,
    noOfPersons: Number,
})

const ratingData = new mongoose.Schema({
    ratingId: Number,
    userId: Number,
    propertyId: Number,
    bookingId: Number,
    reviewDate: String,
    reviewHeading: String,
    reviewDescription: String,
    rating: Number,
})

const contactData = new mongoose.Schema({
    contactId: Number,
    email: String,
    query: String,
    name: String,
    mobile: Number,
})


const UserData = mongoose.model('User', userData);
const PropertyData = mongoose.model('listings', propertyData);
const BookingData = mongoose.model('Booking', bookingData);
const RatingData = mongoose.model('Rating', ratingData);
const ContactData = mongoose.model('Contactus', contactData);

module.exports = { UserData, PropertyData, BookingData, ContactData, RatingData }
