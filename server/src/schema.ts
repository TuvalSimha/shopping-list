import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefinitions } from "./type-definitions";
import { GraphQLContext } from "./context";
import { Item } from "../__generated__/type-resolvers";

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (parent: unknown, args: {}, context: GraphQLContext) =>
      context.prisma.item.findMany(),
    comment: (parent: unknown, args: { id: string }, context: GraphQLContext) =>
      context.prisma.comment.findUnique({
        where: { id: parseInt(args.id) },
      }),
  },
  Item: {
    id: (parent: Item) => parent.id,
    title: (parent: Item) => parent.title,
    quantity: (parent: Item) => parent.quantity,
    status: (parent: Item) => parent.status,
    comments: (parent: Item, args: {}, context: GraphQLContext) =>
      context.prisma.comment.findMany({
        where: { itemId: parseInt(parent.id) },
      }),
  },
  Mutation: {
    async addItem(
      parent: unknown,
      args: { title: string; quantity: string },
      context: GraphQLContext
    ) {
      const newItem = await context.prisma.item.create({
        data: {
          title: args.title,
          quantity: args.quantity,
        },
      });
      return newItem;
    },

    async addCommentOnItem(
      parent: unknown,
      args: { itemId: string; body: string },
      context: GraphQLContext
    ) {
      const newComment = await context.prisma.comment.create({
        data: {
          itemId: parseInt(args.itemId),
          body: args.body,
        },
      });

      return newComment;
    },
  },
};

export const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});
