const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Event {
  _id: ID!
  name: String
  description: String
  price: Float
  date: String
  createdBy: String
}
type User {
  _id: ID!
  name: String
  mobile: String
  email: String!
  password: String
}

input EventInput{
  name: String
  description: String
  price: Float
  date: String
}
input UserInput{
  name: String
  mobile: String
  email: String!
  password: String
}

type RootQuery {
  events: [Event!]!
}

type RootMutation {
  createEvent(eventInput: EventInput): Event!
  createUser(userInput: UserInput): User!
}

schema{
  query:RootQuery
  mutation:RootMutation
}
`)