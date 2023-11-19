const http  = require('http')
const app = require('./app')
const PORT =process.env.PORT || 8081;
const {loadPlanetData} = require('./models/planets.model')
app.listen()
const server = http.createServer(app);
async function startServer (){

    await loadPlanetData();
    server.listen(PORT, () =>{
        console.log(`Listening on port ${PORT}...`)
    })
}
startServer();