const require = require('supertest');
const app = require('./app')

describe('XayDungTestCase', ()=>{
    //planets
    it('return status 200 if get planets pass', async () =>{
        const response = await request(app).get('/planets');
        expect(response.statusCode).toBe(200);
    })
    //launches
    it('return status 200 if get launches pass', async () =>{
        const response = await request(app).get('/launches');
        expect(response.statusCode).toBe(200);
    })

    it('return status 200 if delete launches success', async () =>{
        const id = '1'
        const response = await request(app).post('/launches').send(id);
        expect(response.statusCode).toBe(400);
    })

    it('return status 201 if get launches ', async () =>{
        const LaunchesTest = {
            mission : " Mission for test",
            rocket : "rocket for test",
            target: "NASA",
            LaunchDate : "November 31, 2045"
        }
        const response = await request(app).post('/launches').send(LaunchesTest);
        expect(response.statusCode).toBe(201);
    })
    
    it('return status 400 if get launches error when missing require information', async () =>{
        const LaunchesTest = {
            // missing mission
            // mission : " Mission for test",
            rocket : "rocket for test",
            target: "NASA",
            LaunchDate : "November 31, 2045"
        }
        const response = await request(app).post('/launches').send(LaunchesTest);
        expect(response.statusCode).toBe(400);
    })

    it('return status 400 if get launches error when missing require information', async () =>{
        const LaunchesTest = {
            mission : " Mission for test",
            rocket : "rocket for test",
            target: "NASA",
            // launchDate valid
            LaunchDate : "the day we fly"
        }
        const response = await request(app).post('/launches').send(LaunchesTest);
        expect(response.statusCode).toBe(400);
    })

    it('return status 400 if delete launches is not found id', async () =>{
        const id = '-9999'
        const response = await request(app).post('/launches').send(id);
        expect(response.statusCode).toBe(400);
    })

})