### Project Steps 

* To run project - `npm start`  or  `nodemon app.js`
1. npm init
1. npm i express body-parser path, npm i --save-dev nodemon
1. add script in package.json to use nodemon
1. npm i graphql express-graphql

---
### GraphQl vs REST

#### Advantages of Graphql over Rest
* No over or under fetching
* Dont have to version an api
* Its a type system hence catches silly errors
* self documentation, tooling

#### Disadvantages
* More complex to fetch efficiently (might have to use dataloader, hasura, prisma)
* Harder to cache and rate limit
* request monitoring

---
### Working with graphql
* In Graphql you  ALWAYS sends POST request to a single api endpoint (typically /graphql )
* Post request contains Query expressions to define data that should be returned
* a graphql query looks like
	``` 
	{
		query{
			user{
				name
				age
			}
		}
	}
	```
	query - Operation type  
	user - Operation endpoint  
	name, age - Requested fields
* Operation Types
	1. Query - Retrive Data (GET)
	2. Mutation - Change data (POST, PUT, DELETE)
	3. Subscription - Real time connection via web socket
* Resolvers contain server side logic, simillar to controllers in REST world
* 
```
app.use('/graphql', expressGraphql({
    schema: points at a valid graphql schema,
    rootValue: points at a js function which has all resolvers in it,
}))
```
* [String!] - array of string with not nullable values (cannot have null or undefined)
* rootValue is a bundle of all resolvers
* use cntrl + space for graphiql autocompletion
* creating a custom type event, a type like string Int etc   
	```
  type Event {
		_id: ID!
		name: String
		description: String
		price: Float
		date: String
	}
  ```
* creating a special type "input" which holds a list of arguments   
  ```
  input EventInput{
    name: String
    description: String
    price: Float
    date: String
  }
  ```

---
### Graphiql Queries

1. Get list of all events
```
query GetEvents{
  events
}
```
2. Mutation to add event
```
mutation{
    createEvent(eventInput:{
      name:"Birthday",
      description:"birthday party",
      price:500.5
    }) {
      name
      description
      price
      date
    }
  }
```
3. Mutation to add user
```
mutation{
  createUser(userInput:{
    name:"swati",
    mobile:"9876543210",
    email:"swati.modi@gmail.com",
    password: "swatiPassword"
  }){
    _id
    name
    mobile
    email
    password
  }
}
```
4. Mutation to create Booking
```
mutation{
  bookEvent(eventId : "5e9ac271f5d9930579c38360"){
    _id
    event{
      _id
      name
      description
      price
      date
    }
    user{
      _id
      name
      mobile
      email
    }
    createdAt
    updatedAt
  }
}
```
5. Mutation to cancel booking
```
mutation{
  cancelBooking(bookingId:"5e9bf9a0a8352405ae642f05"){
    name
    price
  }
}
```
6. Query to login 
```
query{
  login(email:"jay@gmail.com", password:"jay123"){
    userId
    token
  }
}
```

---
### Postman Queries
* All Requests will be POST to 'http://localhost:3000/graphql'
* Add to header    
key - 'Authorization'    
value - 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTljNzNlOWZiMWNjMjE0ZjYyNzI4NDIiLCJlbWFpbCI6ImpheUBnbWFpbC5jb20iLCJpYXQiOjE1ODczMTQzODcsImV4cCI6MTU4NzMzMjM4N30.XynZVPuTWxwQMW8vNvb5M9rbXNkQAciQSMB4lyiXtlY'
1. Get list of all events
```
{
	"query":"query { events { name } }"
}
```
### Connecting to mongodb using mongoose
1. Create a cluster on mongodb atlas and add a user with read write permission
2. Note and save connection uri and connect using mongo compass to visualise the db collections
3. install mongoose - `npm i mongoose`
4. use nodemon.json to provide local env variables   
nodemon.json   
`
{
  "env":{
    "MONGO_ADMIN_USERNAME" : "user_one",
    "MONGO_ADMIN_PASSWORD" : "password1",
    "MONGO_ADMIN_URI" : "mongodb+srv://user_one:password1@cluster0-gwbeg.mongodb.net/test?retryWrites=true&w=majority",
  }
}
`

---
### Node
* mongoose.Schema is a constructor function to generate new schema objects
* create models using mongoose.model()
* an object based on a mongoose model has a method of save(), save writes and updates the object in database.
* mongoose return data with some meta data, to get only the data part of event use spread operator as `{ ...event._doc }`
* 'ref' field in schema of a model, lets mongoose know two fields are internally related 
* use bcrypt to hash passwords
* Method populate() is a feature provided by mongoose, that populates any relations it knows
* Adding `{ timestamps: true }` option to mongoose schema, recordes createdOn and updatedOn properties to the model

---
### Json Web Tokens
* `npm i jsonwebtoken`
* Used for authentication in applications which have decoupled Frontend and Backend
* We cannot use a session in decouled application as server doesnt care about the client
* A json web token is passed to the client, which client stores and attaches to subsequent request, and the token can be verified at the server
* sign() is a method on jwt to generate token, the first argument is an object of values we want to save in the token and second is a secret key to hash the token
* In a new auth middleware just set some meta data in headers but do not throw any error, as in graphQl we have a single end point '/graphql'
* In REST we add middlewares to seperate routes, but in graphQl the middleware applies to all as we have a single route

* In graphql queries or mutations args will always be the first object and req second   
`bookings(req)` - This is not as valid req should always be second argument

---
### Issues and their fixes
* mongoose "Event is not a constructor" - 
    use module.exports and not module.export
---

## Adding React Frontend

  ```
  mkdir client || cd client
  npx create-react-app .
  ```

To start react app
`npm start`

To add react-router
`npm i react-router-dom`

---
### React
* For components that require state and logic use class based components
```
import React,{Component} from 'react';

class EventsPage extends Component{
  render(){
    return(
      <h1>Events Page</h1>
    )
  }
}
export default EventsPage;
```

* For components which are mostly design realted use functional componets 
* in functional components we get props
```
import React from 'react';

const navigation = props => (
  <div>
    <h1>The Navbar</h1>
  </div>
);

export default navigation;
```
* <React.Fragment> is just a wrapper component like div 
* Sadly styling in react is written in a different file and is global so classNames are to be prefixed properly   
ps - switch to vue

* To get form data entered we can use two approches
  1. Two way data binding   
  start managing state and add binding to input fields
  1. Use References   
  ```
  constructor(props){
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  <input type="email" id="email" placeholder="Email" ref={this.emailEl}></input>
  <input type="password" id="password" placeholder="Password" ref={this.passwordEl}></input>
  ```

---

### React Routing
* To Redirect from a path to a component
* adding switch to redirect means only the first of matching alternatives will be used
* using switch it will instantly redirect and not evaluate other routes
  ```
  <Redirect from="/" to="/login"/>
  <Route path="/login" component={LoginPage}/>
  ```
* exact word specifies redirect if path is exactly '/'
* use NavLink and not 'anchor' tag as 'anchor' tag reloads the page which we do not want for a spa
