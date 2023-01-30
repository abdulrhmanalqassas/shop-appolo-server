let arc = require('@architect/functions')
let { gql} = require('apollo-server-lambda')
let a =  require('apollo-server')



let typeDefs = gql`
  type Query {
    hello: String
  }
`

let resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
}

let server = new ApolloServer({typeDefs, resolvers})
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
let handler = server.createHandler()

exports.handler = function(event, context, callback) {
  let body = arc.http.helpers.bodyParser(event)
  console.log(body)
  // Support for AWS HTTP API syntax
  event.httpMethod = event.httpMethod
    ? event.httpMethod
    : event.requestContext.http.method
  // Also support hte HTTP syntax...
  event.path = event.rawPath
  // Body is now parsed, re-encode to JSON for Apollo
  event.body = JSON.stringify(body)
  handler(event, context, callback)
}
