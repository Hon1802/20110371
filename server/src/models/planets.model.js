const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');
// const parse = require('csv-parse');
const { parse } = require('csv-parse');
const { resolve } = require('path');

const habitablePlanets = [];
const planets = require('./planets.mongo')
function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}
function loadPlanetData(){
    return new Promise((resolve, rejects) =>{
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv'))
        .pipe(parse({
          comment: '#',
          columns: true,
        }))
        .on('data', (data) => {
          if (isHabitablePlanet(data)) {
            // habitablePlanets.push(data);
            savePlanet(data)
          }
        })
        .on('error', (err) => {
          console.log(err);
          rejects(err)
        })
        .on('end', async () => {
          const countPlanetsFound = (await getAllPlanets()).length;
          console.log(`${countPlanetsFound} habitable planets found!`);
          resolve()
        });
    }); 
        
}

// function getAllPlanets(){
//     return habitablePlanets;
// }
async function getAllPlanets(){
  return await planets.find({},{
    '_id':0,
    '_v':0
  });
}

async function savePlanet(planet)
{
  try{
    await planets.updateOne({
      keplerName: planet.kepler_name
    },
    {
      keplerName: planet.kepler_name
    },{
      upset : true
    });
  } catch(e)
  {
    console.log('could not save planet')
  }
}


module.exports={
    loadPlanetData,
    getAllPlanets,
};