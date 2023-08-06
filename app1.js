const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const expressSession = require('express-session');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const profileRoutes = require('./routes/profile-routes');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
const server = app.listen(5000, () => {
    console.log('requests on port 5000');
});

app.use(expressSession({

    secret: 'mySecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false, // if true: only transmit cookie over https
        httpOnly: true, // if true: prevents client side JS from reading the cookie
        maxAge: 1000 * 60 * 60 * 60, // session max age in milliseconds
        sameSite: 'lax' // make sure sameSite is not none
    }
}))

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(keys.mongodb.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('connected to db');
    })
    .catch((err) => {
        console.log(err);
    })

app.get('/', (req, res) => {
    res.render('home', { user: req.user });
});

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
