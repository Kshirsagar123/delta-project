
require('dotenv').config();

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

 

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

const listingRouter = require('./routes/listing');
const reviewRouter = require('./routes/review');
const { date } = require('joi');
const userRouter = require('./routes/user.js'); 

//const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const dbUrl = process.env.ATLASDB_URL;

main().then(() => {
    console.log("connected to DB");
}).catch(err => {
    console.log(err);

});

async function main() {
    await mongoose.connect(dbUrl);

}

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600 // time period in seconds
});

store.on("error", () => {
    console.log("Error in mongo session store", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7 , // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
    }
};

// app.get('/', (req, res) => {
//     res.send('Hi I am root');
// });




app.use(session(sessionOptions)); 
app.use(flash()); 

app.use(passport.initialize()); 
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// //demo user
// app.get('/demouser', async (req, res) => {
//     let fakeuser = new User({
//         email: "student@gmail.com",
//         username: "delta-student" 
//     });
//     const registeredUser = await User.register(fakeuser, "helloworld");
//     res.send(registeredUser);
// });

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);



// 404 Handler (no path → works in Express 5)
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { message });
    // res.status(statusCode).send(message);
});




app.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
});