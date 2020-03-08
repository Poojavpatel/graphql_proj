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
* In Graphql you  ALWAYS sends POST request to a sinle api endpoint (typically /graphql )
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
### Project Steps 

* To run project - `npm start`
1. npm init
1. npm i express body-parser, npm i --save-dev nodemon
1. add script in package.json to use nodemon
1. npm i graphql express-graphql

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

