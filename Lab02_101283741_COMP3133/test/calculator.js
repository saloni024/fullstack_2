var expect = require("chai").expect;
var calculator = require("../app/calculator");

describe("Addition", () => {
    describe("It adds two numbers", () => {
        var pass = calculator.add(5,2);
        var fail = calculator.add(5,2);

        it("passed the test!", (done) => {
            expect(pass).to.equal(7);
            done();
          });
        it("failed the test!", (done) => {
            expect(fail).to.equal(8);
            done();
          });
    })
})

describe("Subtraction", () => {
    describe("It subtracts two numbers", () => {
        var pass = calculator.sub(5,2);
        var fail = calculator.sub(5,2);

        it("passed the test!", (done) => {
            expect(pass).to.equal(3);
            done();
          });
        it("failed the test!", (done) => {
            expect(fail).to.equal(5);
            done();
          });
    })
})

describe("Multiplication", () => {
    describe("It multiplies two numbers", () => {
        var pass = calculator.mul(5,2);
        var fail = calculator.mul(5,2);

        it("passed the test!", (done) => {
            expect(pass).to.equal(10);
            done();
          });
        it("failed the test!", (done) => {
            expect(fail).to.equal(12);
            done();
          });
        
    })
})

describe("Division", () => {
    describe("It divides two numbers", () => {
        var pass = calculator.div(10,2);
        var fail = calculator.div(10,2);

        it("passed the test!", (done) => {
            expect(pass).to.equal(5);
            done();
          });
        it("failed the test!", (done) => {
            expect(fail).to.equal(2);
            done();
          });
    })
})