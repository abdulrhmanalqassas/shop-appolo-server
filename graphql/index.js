let arc = require('@architect/functions')
let {ApolloServer, gql} = require('apollo-server-lambda')
import resolvers  from "./resolvers"
var resolvers_1 = __importDefault(require("./resolvers"));
let resolvers = require("./resolvers/index.js")

let typeDefs = gql`
      type Price {
        currency: Currency!,
        amount: Float!
    }

    type Attribute {
        displayValue: String,
        value: String,
        id: String!
    }

    type AttributeSet {
        id: String!,
        name: String,
        type: String,
        items: [Attribute]
    }

    type Product {
        id: String!,
        name: String!,
        inStock: Boolean,
        gallery: [String],
        description: String!,
        category: String!,
        attributes: [AttributeSet]
        prices: [Price!]!,
        brand: String!
    }

    type Category {
        name: String,
        products: [Product]!
    }

    type Currency {
        label: String!,
        symbol: String!
    }

    input CategoryInput {
        title: String!
    }

    type Query {
        categories: [Category],
        category(input: CategoryInput): Category,
        product(id: String!): Product,
        currencies: [Currency]
    }
`



let server = new ApolloServer({typeDefs,resolvers_1})
let handler = server.createHandler()

exports.handler = function(event, context, callback) {
  let body = arc.http.helpers.bodyParser(event)
  console.log(body)
  console.log(resolvers)
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
