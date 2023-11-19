// const launches = new Map();
const launchesDatabase = require('./launches.mongo')
const axios = require('axios');
const planets = require('./planets.mongo')
let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER =100;
const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

async function populateLaunches() {
  console.log('Downloading launch data...');
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: 'rocket',
          select: {
            name: 1
          }
        },
        {
          path: 'payloads',
          select: {
            'customers': 1
          }
        }
      ]
    }
  });

  if (response.status !== 200) {
    console.log('Problem downloading launch data');
    throw new Error('Launch data download failed');
  }

  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc['payloads'];
    const customers = payloads.flatMap((payload) => {
      return payload['customers'];
    });

    const launch = {
      flightNumber: launchDoc['flight_number'],
      mission: launchDoc['name'],
      rocket: launchDoc['rocket']['name'],
      launchDate: launchDoc['date_local'],
      upcoming: launchDoc['upcoming'],
      success: launchDoc['success'],
      customers,
    };

    console.log(`${launch.flightNumber} ${launch.mission}`);

    await saveLaunch(launch);
  }
}
const launch = {
    flightNumber: '100',
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM','NASA'],
    upcoming: true,
    success: true,
};
// launches.set(launch.flightNumber, launch);
async function loadLaunchData(){
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat',
    });
    if(firstLaunch)
    {
        console.log('Launch data already loaded!')
    }
    else{
        await populateLaunches();
    }
}
async function getAllLaunches(skip, limit){
    // return Array.from(launches.values());
    return await launchesDatabase
    .find({},{ '_id':0, 'v':0})
    .sort({flightNumber: 1})
    .skip(skip)
    .limit(limit)
}
async function findLaunch(filter){
    return await launchesDatabase.findOne(filter);
}
async function existLaunchWithId(launchId)
{
    // return launches.has(launchId);
    return await findLaunch({
        flightNumber: launchId,
    })
}
function addNewLaunch(launch){
    latestFlightNumber++;
    launches.set(latestFlightNumber,Object.assign(launch,{
        success: true,
        upcoming:true,
        customer: ['Zero to Mastery','NASA'],
        flightNumber: latestFlightNumber,
    }));
}

async function abortLaunchById(launchId){
    // const aborted = launches.get(launchId);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;
    const aborted = await launchesDatabase.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    });
    return aborted.modifiedCount === 1;
}

module.exports={
    loadLaunchData,
    existLaunchWithId,
    getAllLaunches, 
    addNewLaunch,
    abortLaunchById
}
