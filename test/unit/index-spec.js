const expect = require('chai').expect;
const attr = require('../../src/index');

describe('sample', () => {
  it('attr', () => {
    expect('attr').to.be.a('string');
    expect(attr).to.be.an('object');
  });
});
