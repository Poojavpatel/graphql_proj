const express = require('express');
const bodyParser = require('body-parser');
const expressGraphql = require('express-graphql');
const mongoose = require('mongoose');

const graplQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');
const isAuth = require('./middleware/auth');

const app = express();
app.use(bodyParser.json());

// set headers to allow cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if(req.method === 'OPTIONS'){
    return res.sendStatus(200);
  }
  next();
});

// using middleware for authentication
app.use(isAuth);

app.use('/graphql', expressGraphql({
  schema: graplQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true,
}))

app.get('/', (req, res, next) => {
  res.send('Welcome to event booking api');
})

const port = process.env.PORT || 5000;
mongoose.connect(`mongodb+srv://${process.env.MONGO_POOJA_USERNAME}:${process.env.MONGO_POOJA_PASSWORD}@cluster0-gwbeg.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
  .then( () => console.log('--- Successfully connected to MongoDB ---'))
  .catch(error => console.log('--- Error while connecting to MongoDB ---', error));


app.listen(port, console.log(`---- Server started on port ${port} ----`));
