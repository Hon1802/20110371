const express = require('express');
const path  = require('path')
const planetsRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')
const app = express();
const cors= require('cors')
const morgan = require('morgan')
const {connect} = require('./services/mongo') ;
const { loadPlanetData } = require('./models/planets.model')
const { loadLaunchData } = require('./models/launches.model')
app.use(cors({
    origin:'http://localhost:3000',
}))
connect();
loadPlanetData();
loadLaunchData();
app.use(morgan('combined'));
app.use(express.json())
app.use(express.static(path.join(__dirname,'..','public')));
app.use('/planets',planetsRouter)
app.use('/launches', launchesRouter)
app.get('/*',(req, res) =>{
    res.sendFile(path.join(__dirname,'..','public','index.html'));
})
module.exports = app;