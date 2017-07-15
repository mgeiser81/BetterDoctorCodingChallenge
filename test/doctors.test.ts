import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/doctors/search', () => {

    it('responds with a 422 unprocessable entity response for a missing param', () => {
      return chai.request(app).get('/api/v1/doctors/search')
      .then(res => {
        expect(res.status).to.equal(422);
      });
    });

    it('responds with JSON array with 10 items', () => {
      return chai.request(app).get('/api/v1/doctors/search?name=Sawyer')
        .then(res => {
          expect(res.status).to.equal(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.length(10);
        });
    });
});