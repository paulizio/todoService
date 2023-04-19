const dynamodb = require('aws-sdk/clients/dynamodb')
const docClient = new dynamodb.DocumentClient()
const TODO_TABLE = process.env.TODO_TABLE
const getAll = () => {
  try {
    return docClient.query({
      TableName: TODO_TABLE,
      KeyConditionExpression: 'todoType = :todoType',
      ExpressionAttributeValues: {
        ':todoType': 'TASK#'
      }
    }).promise()
  } catch (err) {
    throw new Error(`Error fetching items: ${err}`)
  }
}

const deleteItem = (id) => {
  try {
    return docClient.delete({
      TableName: TODO_TABLE,
      Key: {
        todoType: 'TASK#',
        id
      }
    }).promise()
  } catch (err) {
    throw new Error(`Error deleting item: ${err}`)
  }
}

const create = (params) => {
  const { item } = params
  try {
    return docClient.put({
      TableName: TODO_TABLE,
      Item: item,
      ConditionExpression: 'attribute_not_exists(id)'
    }).promise()
  } catch (err) {
    throw new Error(`Error creating new item: ${err}`)
  }
}

module.exports = {
  getAll,
  deleteItem,
  create
}
