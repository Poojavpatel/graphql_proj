const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
app.use(bodyParser.json());

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

    input EventInput{
      name: String
      description: String
      price: Float
      date: String
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event!
    }

    schema{
      query:RootQuery
      mutation:RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return events;
    },
    createEvent: (args) => {
      const event = {
        _id: Math.random().toString(),
        name: args.eventInput.name,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date().toISOString(),
      }
      events.push(event);
      return event;
    }
  },
  graphiql: true,
}))

app.get('/', (req, res, next) => {
  res.send('Welcome to event booking api');
})

app.listen(3000, console.log('---- Server started on port 3000 ----'));
