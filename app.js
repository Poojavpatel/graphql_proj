const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event');

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
    createEvent: async (args) => {
      const event = new Event({
          name: args.eventInput.name,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date: new Date(),
      })
      const eventObj = await event.save();
      console.log('----eventObj----', eventObj);
      return eventObj;
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
