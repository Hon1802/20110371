const https = require('https');
const path = require('path');
const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
const {verify} = require('crypto');
const fs = require('fs');
require('dotenv').config(); 
const PORT = process.env.PORT;
const helmet = require('helmet');
const app = express();
app.use(helmet());
app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 *1000,
  keys :["cyberwolve"]
}))
//config
const config = {
  CLIENT_ID : process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
}
const AUTH_OPTIONS = {
  callbackURL : '/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET
}
function verifyCallback(accessToken, refreshToken, profile, done)
{
  console.log('Profile GG', profile);
}
passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
passport.serializeUser((user, done)=>{
  done(null, user.id);
})
passport.deserializeUser((id, done)=>{
  done(null, id);
})

app.use((req, res, next)=>{
  if(req.session && !req.session.regenerate)
  {
    req.session.regenerate =(cb)=>{
      cb();
    };
  }
  if(req.session && !req.session.save)
  {
    req.session.save = (cb)=>{
      cb();
    };
  };
  next();
})
app.use(passport.initialize());
app.use(passport.session());
function checkLoggedIn(req, res, next){
  console.log("Current user is: ", req.user._json);
  const isLoggedIn = req.isAuthentication() && req.user;
  if(!isLoggedIn)
  {
    return res.status(401).json({
      error: "You must login!",
    })
  }
  next();
}

app.get('/auth/google',
  passport.authenticate('google',{
    scope:['email'],
  })
);

app.get('/auth/google/callback',
  passport.authenticate('google',{
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,
  }),
  (req, res)=>{
    console.log('Google called us back !!!')
  }
);
app.get('/auth/logout',(req, res, next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    res.redirect('/');
  });
});

app.get('/secret', checkLoggedIn, (req, res) => {
  return res.send('Your personal secret value is 42!');
});

app.get('/failure', (req, res) => {
  return res.send('Failed to log in!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
},app).listen(PORT,() =>{
  console.log(`Listening on port ${PORT}...`)
})