const express = require('express')
const launchesRouter =express.Router();
const {httpGetAllLaunches, httpAddNewLaunch, httpAboutLaunch} =require('./launches.controller')
launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAboutLaunch);
module.exports = launchesRouter;