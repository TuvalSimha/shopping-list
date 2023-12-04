import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefinitions } from "./type-definitions";
import { GraphQLContext } from "./context";

type Link = {
  id: string;
  title: string;
};

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (parent: unknown, args: {}, context: GraphQLContext) =>
      context.prisma.item.findMany(),
  },
  Item: {
    id: (parent: Link) => parent.id,
    title: (parent: Link) => parent.title,
  },
  Mutation: {
    async addItem(
      parent: unknown,
      args: { title: string },
      context: GraphQLContext
    ) {
      const newItem = await context.prisma.item.create({
        data: {
          title: args.title,
        },
      });
      return newItem;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
