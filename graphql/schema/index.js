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
type Booking {
  _id: ID!
  event: Event
  user: User
  createdAt : String
  updatedAt: String
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
  users: [User!]
  bookings: [Booking!]!
}

type RootMutation {
  createEvent(eventInput: EventInput): Event!
  createUser(userInput: UserInput): User!
  bookEvent(eventId: ID!) : Booking!
  cancelBooking(bookingId: ID!): Event!
}

schema{
  query:RootQuery
  mutation:RootMutation
}
`)