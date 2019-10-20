const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app).get('/apps').expect(200).expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        });
    })

    it('should be 400 if sort is incorrect', () => {
        return supertest(app).get('/apps').query({ sort: 'MISTAKE' }).expect(400, 'Sort must be rating or app')
    })

    it('should sort by rating', () => {
        return supertest(app)
        .get('/apps')
        .query({ sort: 'Rating' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.be.an('array');
        let sorted = true;

        let i = 0;

        while (i < res.body.length - 1) {
            const appAtI = res.body[i];
            const appAtIPlus1 = res.body[i + 1];

        if (appAtIPlus1.Rating < appAtI.Rating) {
            sorted = false;
            break;
        }
        i++
        }
        expect(sorted).to.be.true;
        });
    });

    it('should sort by genre', () => {
        

        return supertest(app)
        .get('/apps')
        .query({ Genres: 'Action' })
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.body).to.include('"Genre:" "Action"');
          });
    });
});

        
    
