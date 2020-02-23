const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
app.use(bodyParser.json());

app.use('/graphql', expressGraphql({
  schema: buildSchema(`

    type RootQuery {
      events: [String!]!
    }

    type RootMutation {
      createEvent(name: String): String
    }

    schema{
      query:RootQuery
      mutation:RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return ['Birthday', 'Anniversary', 'Dance', 'Comedy', 'Coding', 'Running']
    },
    createEvent: (args) => {
      const eventName = args.name;
      return `${eventName} event created`;
    }
  },
  graphiql: true,
}))

app.get('/', (req, res, next) => {
  res.send('Welcome to event booking api');
})

app.listen(3000, console.log('---- Server started on port 3000 ----'));
