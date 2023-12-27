# gql Notes

GraphQL is like a query language for API's. Like how SQL is DSL for RDBMSs, Graphql is for APIs.

- Problem Solved by GraphQL:
  - Less number of AJAX calls from client to server or other endpoints
  - Client doesn't know anything about underlying endpoints and thinks Graphql route/endpoint is its source
  - Thinner server can be developed
  - Development can be faster, front-end folks don't need depend too heavily on the backend folks, if and only if backend folk don't change the under lying API too much
  - Only the data requested is sent! No need to pick and choose things you want from a giant set of data

- Data is saved/represented in the form of a graph, where in edges determine relations... like a Social Network
  - Getting the data is via trversal of edges

- GraphQL is used as a middleware. It needs a schema to function properly. Basically what every single object would look like just like DBSchemas
  - A _RootQuery_ is what determines the entry point into the graph, a type of GraphQL object
    ```javascript
      name: 'RootQueryType',
      fieds: {
        book: {
          type: BookType,
          args: {
              id: {
                  name: 'BookId',
                  type: GraphQLString
                }
            },
          resolve(parent, args){
            // id is available on args so calls to DB/APIs to get data from
          }
        }
      }
    ```

- Query structure:
  - ```
    <queryType> (argsForResolvingQuery){
      csv - Fields/attributes one needs from the GraphQL Obj
    }
  ```
    - `queryType` - The type of GraphQL object to query. ex: HumanType = GraphQLObjectType(<anObjectSpecifyingThisObjectsStructureFieldTypes>)

    - `argsForResolvingQuery` - When this query hits the `graphql` endpoint/route, based on the type of GraphQL object, the respective `RootQuery` is referred. The `RootQuery`, holds the definition of how this type query will be resolved, the structure of the `args` object, ex: id, name etc. that *will* be supplied in the query and a resolution handler function, a `resolver`, that maps the query from the query space to the resolved object space. Details of where to get the object form etc.

    - `csv` - what you want from the GraphQL objsct you are trying to Query.

- Establishing relations:
  - When there's a necsessity to get related data, ex: userAddress from the user microservice/user DB/user table, the `GraphQLObjectType` that you are trying to query and wish to include linked info the definition of such an object includes the nested type (relatedItem) and resolver to handle the resolution of that object

  - The resolver signature, `resolve(parent, args)`, will have info of the main obj and the args for the related obj

- When defining the types of objects, the fields are wrapped in a function to avoid a circular object refernce problem. This happens when we are trying to relate objects

- Once the _RootQuery_ for all the types of queries is defined, the permutations of those queries is nicely handled by graphql. ex: books, authors rootQueries return all books and authors, can be also used to return all books by each author with varying levels of details

- Mutations:
  - POST requests, for creating AND updating data

- GraphQL on the front-end is taken care of by Apollo.
  - From the three packages that are installed `gql`, from `apollo-boost`, is used to wrap the queries

  - `graphql` package from `react-apollo` binds the component that needs to make the query to the query itself thereby making the data available in the `props`

  - When the component loads the query is still executing in the background and once it finishes the component re-renders

- Compose:
  - Combining queries and binding to component, `compose` from `react-apollo` serves exactly this puprpose! Kinda acts like `combineReducers`, where exactly?

  - When we `matchStateToProps` and if we are using `combineReducers` then the respective piece of state is available on the `state.<reducerName>`, similarly the data returned for that particular query or mutation is avialable on `props.<mutationNameOrqueryName>` as opposed to `data`

- Scalar and Custom types:
  - Scalar: Int, Float, String, Boolean
    - An array of scalar types can be returned. In the query you don't need to specify what fields one wants unlike custome types

  - Custom: User defined, require resolvers for each field
    - Need to have a selection set say

    ```javascript
    user {
      name
      id
    }
    ```

## Subscriptions

  Uses Web sockets to keep data updated, no need to fire query again, and keep the subscriber informed (Kinda like polling but better, or subscribing to a Redux store). Latest changes in real time
