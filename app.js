const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();
// set view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

//set up session cookies
app.use(cookieSession({
    //a day long cookie
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//advaitaa
app.use((req, res, next) => {
    if (req.session && !req.session.regenerate) {
        req.session.regenerate = (cb) => {
            cb();
        }
    }
    if (req.session && !req.session.save) {
        req.session.save = (cb) => {
            cb();
        }
    }
    next();
});

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
// routes
app.use('/auth', authRoutes);
app.use('/profile',profileRoutes );


//connect to mongoDB
mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result)=>{
        console.log('connected to db');
        app.listen(5000, ()=>{
            console.log('requests on port 5000');
        });
    })
    .catch((err)=>{
        console.log(err);
    })

//create home route
app.get('/', (req, res)=>{
    res.render('home');
});

