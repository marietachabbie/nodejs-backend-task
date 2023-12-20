const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const app = require("../src/app");
const userService = require("../src/services/userService");

const mockUsers = require("../src/data/initial-users.json");

const USER_ID = mockUsers[0].id;
const REQUEST_BODY = {
  userId: USER_ID,
  amount: 2,
}

describe("*** Responses of the app routes ***", () => {

  describe("GET /", () => {
    it("Returns 200 status", (done) => {
      chai.request(app)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
  
  describe("GET /users", () => {
    it("Returns 3 users from database", (done) => {
      chai.request(app)
        .get("/users")
        .end((err, res) => {
          expect(res._body).to.have.lengthOf(3);

          const resIds = res._body.map(res => res.id);
          const mockIds = mockUsers.map(mock => mock.id);

          expect(resIds).to.have.members(mockIds);
          done();
        });
    });
  });

  describe("GET /users/:userId", () => {
    it("Returns the requested user from database", (done) => {
      chai.request(app)
      .get("/users/" + USER_ID)
      .end((err, res) => {
        expect(res._body).to.be.eql([ mockUsers[0] ]);
        done();
      });
    });
  });
  
  describe("POST /users/increment", () => {
    it("Increments the balance by the given amount", (done) => {
      chai.request(app)
        .post("/users/increment")
        .send(REQUEST_BODY)
        .end((err, res) => {
          expect(res._body).to.be.eql([[[ { ...mockUsers[0], balance: "10002" } ], 1 ]])
          done();
        });
    });
  });

  describe("POST /users/decrement", () => {
    it("Decrements the balance by the given amount", (done) => {
      chai.request(app)
        .post("/users/decrement")
        .send(REQUEST_BODY)
        .end((err, res) => {
          expect(res._body).to.be.eql([[[ { ...mockUsers[0], balance: "10000" } ], 1 ]])
          done();
        });
    });
  });
  
  describe("POST /users/decrement 5000 times", () => {
    for (let i = 0; i < 5000; i++) {
      it("Decrements the balance by the given amount until it is zero", (done) => {
        chai.request(app)
          .post("/users/decrement")
          .send(REQUEST_BODY)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          }); 
      });
    };

    for (let i = 0; i < 5000; i++) {
      it("Gets proper error when balance would be negative if decremented", (done) => {
        chai.request(app)
          .post("/users/decrement")
          .send(REQUEST_BODY)
          .end((err, res) => {
            expect(res).to.have.status(418);
            expect(res.text).to.be.equal("Balance cannot be negative");
            done();
          }); 
      });
    };
  });

})
