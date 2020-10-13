const server = require('./server.js');
const request = require('supertest');
const db = require('../data/dbConfig.js');

const testBike = {make: 'Honda', model: 'CBR 1000', year: 2000}
const badTestBike = {mazek: 'Honda', modekz: 'CBR 1000', year: 2000}


describe('server.js', () => {

    beforeEach(async () => {
        await db('bikes').truncate();
    })

    describe('POST /bikes', () => {
        
        it('should return status 201 after insertion', async () => {
            let res = await request(server)
                .post('/bikes')
                .send(testBike)
                expect(res.status).toBe(201); 
        });
        
        it('should return status status 500 if the body is not correct', async () => {
            let res = await request(server)
                .post('/bikes')
                .send(badTestBike)
                expect(res.status).toBe(500)
        })
        
    });

    describe('GET /bikes', () => {

        it('1st entry should be a 2000 honda CBR 1000', async () => {
            let pre = await request(server)
                .post('/bikes')
                .send(testBike)

            let res = await request(server).get('/bikes')
                expect(res.body[0]).toEqual({
                    "id": 1,
                    "make": "Honda",
                    "model": "CBR 1000",
                    "year": 2000
                })
        })

        it('should return a status of 200 for a succesful request', async () => {
            let res = await request(server).get('/bikes')
            expect(res.status).toBe(200);
        })
    })

    describe('DELETE /bikes/:id', () => {
        
        it('should return status 201 upon deletion', async () => {
            let pre = await request(server)
            .post('/bikes')
            .send(testBike)

            let res = await request(server)
                .delete('/bikes/1')
                expect(res.status).toBe(201);
        })

        it('should return 404 is no id is passed', async () => {
            let res = await request(server)
                .delete('/bikes')
                expect(res.status).toBe(404);
        })
    })

    

})