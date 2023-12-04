import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefinitions } from "./type-definitions";

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
