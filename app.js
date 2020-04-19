const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const mongoose = require('mongoose');

const graplQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

const events = [];

app.use('/graphql', expressGraphql({
  schema: graplQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
}))

app.get('/', (req, res, next) => {
  res.send('Welcome to event booking api');
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_POOJA_USERNAME}:${process.env.MONGO_POOJA_PASSWORD}@cluster0-gwbeg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then( () => console.log('--- Successfully connected to MongoDB ---'))
  .catch(error => console.log('--- Error while connecting to MongoDB ---', error));


app.listen(port, console.log(`---- Server started on port ${port} ----`));
