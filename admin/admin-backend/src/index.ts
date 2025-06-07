import { readFileSync } from "fs";
import { resolvers } from "./graphql/resolver";

require("dotenv").config();

const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// GraphQL Schema
const schema = buildSchema(
  readFileSync("./src/graphql/schema.graphql", "utf8")
);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
