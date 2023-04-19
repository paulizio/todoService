
const query = require('../../../src/handlers/query')
const dynamoHandler = require('../../../src/dynamoHandler/dynamoHandler')
const sinon = require('sinon')
const chai = require('chai')
expect = chai.expect
describe('query', () => {
  let thread, params, response
  beforeEach(() => {
    params = {
      httpMethod: 'GET'
    }
    sinon.stub(dynamoHandler, 'getAll').resolves({Items:[]})
  })

  afterEach(() => sinon.restore())
  it('should return expected response', async () => {
    const res = await query.getAllItemsHandler(params)
    expect(res.statusCode).equal(200)
    expect(res.body).equal('[]')
  })
})
