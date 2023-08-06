// ../ maane alag folder
// ./ maane same folder
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done)=>{
    done(null, user.id);
    //null iseliye ki agar koi error aajaye to
    //but aayega nahi error
});

passport.deserializeUser((id, done)=>{
    User.findById(id)
        .then((user)=>{
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //asynchronous
        User.findOne({ googleID: profile.id })
            .then((curUser) => {
                if (curUser) { 
                    done(null, curUser);
                    //ab serialize hoga user upar
                }
                else {
                    new User({
                        username: profile.displayName,
                        googleID: profile.id,
                        thumbnail: profile.photos[0].value
                    }).save()
                        .then((newUser) => {
                            done(null, newUser);
                        });
                }
            })
    })
);