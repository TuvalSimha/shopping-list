export const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Item!]!
  }

  type Mutation {
    addItem(title: String!): Item!
  }

  type Item {
    id: ID!
    title: String!
  }
`;
