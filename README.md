### Project Steps 

* To run project - `npm start`  or  `nodemon app.js`
1. npm init
1. npm i express body-parser path, npm i --save-dev nodemon
1. add script in package.json to use nodemon
1. npm i graphql express-graphql

---
# GraphQl vs REST

### Advantages of Graphql over Rest
* No over or under fetching
* Dont have to version an api
* Its a type system hence catches silly errors
* self documentation, tooling

### Disadvantages
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
* creating a new event using the mutation
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


---
### Graphiql Queries

1. Get list of all events
```
query GetEvents{
  events
}
```
2. Access Mutations
```
mutation {
  createEvent(name: "Dance")
}
```

---
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


### Issues and their fixes
* mongoose "Event is not a constructor" - 
    use module.exports and not module.export

