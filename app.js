const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const events = [];

app.use('/graphql', expressGraphql({
  schema: buildSchema(`
    type Event {
      _id: ID!
      name: String
      description: String
      price: Float
      date: String
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
  `),
  rootValue: {
    events: () => {
      return Event.find();
    },
    users: () => {
      return User.find();
    },
    createEvent: (args) => {
      const event = new Event({
        name: args.eventInput.name,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(),
      });
      return event.save();
    },
    createUser: (args) => {
      return User.findOne({ email:args.userInput.email })
      .then(user => {
        if(user){
          throw new Error('User email already exists');
        }
        return bcrypt.hash(args.userInput.password, 12)
      }).then(hashedPassword => {
          const user = new User({
            name: args.userInput.name,
            mobile: args.userInput.mobile,
            email: args.userInput.email,
            password: hashedPassword,
          });
          return user.save();
        })
        .catch(err => {
          throw err
        });
    }
  },
  graphiql: true,
}))

app.get('/', (req, res, next) => {
  res.send('Welcome to event booking api');
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_POOJA_USERNAME}:${process.env.MONGO_POOJA_PASSWORD}@cluster0-gwbeg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then( () => console.log('--- Successfully connected to MongoDB ---'))
  .catch(error => console.log('--- Error while connecting to MongoDB ---', error));


app.listen(port, console.log(`---- Server started on port ${port} ----`));
