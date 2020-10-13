const Bikes = require('./bikesModel.js');
const db = require('../data/dbConfig.js');

describe('bikes model', () => {


    describe('insert', () => {

        beforeEach(async () => {
            await db('bikes').truncate();
        })

        it('should have the correct length of entries', async () => {
            await Bikes.insert({ make: 'Honda', model: 'CBR 1000', year: 2000 });

            const bikes = await db('bikes');
            expect(bikes).toHaveLength(1)
        })

        it('should have the correct insertion', async () => {
            let bikes = await Bikes.insert({ make: 'Honda', model: 'CBR 1000', year: 2000 });
            expect(bikes.make).toBe('Honda');
            expect(bikes.model).toBe('CBR 1000');
            expect(bikes.year).toBe(2000);

        })

    })
})