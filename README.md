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
