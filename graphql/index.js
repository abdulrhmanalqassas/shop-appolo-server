let arc = require('@architect/functions')
let {ApolloServer, gql} = require('apollo-server-lambda')
console.log(">>>>>>>>>>>>>>>>>>>>>>>>in index file")
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







// let arc = require("@architect/functions");
// let { ApolloServer, gql } = require("apollo-server-lambda");
// // import resolvers  from "./resolvers"
// // var resolvers_1 = __importDefault(require("./resolvers"));
// // let resolvers = require("./resolvers/index.js")

// let typeDefs = gql`
//   type Query {
//     currency: Currency!
//     amount: Float!
//   }
// `;
// //     type Attribute {
// //         displayValue: String,
// //         value: String,
// //         id: String!
// //     }

// //     type AttributeSet {
// //         id: String!,
// //         name: String,
// //         type: String,
// //         items: [Attribute]
// //     }

// //     type Product {
// //         id: String!,
// //         name: String!,
// //         inStock: Boolean,
// //         gallery: [String],
// //         description: String!,
// //         category: String!,
// //         attributes: [AttributeSet]
// //         prices: [Price!]!,
// //         brand: String!
// //     }

// //     type Category {
// //         name: String,
// //         products: [Product]!
// //     }

// //     type Currency {
// //         label: String!,
// //         symbol: String!
// //     }

// //     input CategoryInput {
// //         title: String!
// //     }

// //     type Query {
// //         categories: [Category],
// //         category(input: CategoryInput): Category,
// //         product(id: String!): Product,
// //         currencies: [Currency]
// //     }
// // `

// let server = new ApolloServer({ typeDefs, mocks : true });
// let handler = server.createHandler();

// exports.handler = function (event, context, callback) {
//   let body = arc.http.helpers.bodyParser(event);
//   console.log(body);
//   console.log(resolvers);
//   // Support for AWS HTTP API syntax
//   event.httpMethod = event.httpMethod
//     ? event.httpMethod
//     : event.requestContext.http.method;
//   // Also support hte HTTP syntax...
//   event.path = event.rawPath;
//   // Body is now parsed, re-encode to JSON for Apollo
//   event.body = JSON.stringify(body);
//   handler(event, context, callback);
// };

// // var __importDefault = (this && this.__importDefault) || function (mod) {
// //   return (mod && mod.__esModule) ? mod : { "default": mod };
// // };
// // Object.defineProperty(exports, "__esModule", { value: true });
// // var apollo_server_1 = require("apollo-server");
// // var schema_1 = __importDefault(require("./schema"));
// // var resolvers_1 = __importDefault(require("./resolvers"));
// // var server = new apollo_server_1.ApolloServer({
// //   typeDefs: schema_1.default,
// //   resolvers: resolvers_1.default
// // });
// // server.listen().then(function (_a) {
// //   var url = _a.url;
// //   console.log("\uD83D\uDE80  Server ready at " + url);
// // });
