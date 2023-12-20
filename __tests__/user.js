// const expect = require("chai").expect;
const request = require("supertest");
// const express = require("express");

const app = require("../src/app");

describe('GET /', () => {
  it("Returns 200 status", (done) => {
    request(app)
    .get('/')
    .expect(200)
    .end((err, r) => {
      if (err) done(err)
      done();
    });
  });

  // expect(res.status).to.be(200);
});
