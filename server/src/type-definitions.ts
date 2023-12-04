export const typeDefinitions = /* GraphQL */ `
  type Query {
    info: String!
    feed: [Item!]!
    comment(id: ID!): Comment
  }

  type Mutation {
    addItem(title: String!, quantity: String!): Item!
    addCommentOnItem(itemId: ID!, body: String!): Comment!
  }

  type Item {
    id: ID!
    title: String!
    quantity: String!
    comments: [Comment!]!
    status: ItemStatus!
  }

  enum ItemStatus {
    ACTIVE
    INACTIVE
    PENDING
  }

  type Comment {
    id: ID!
    body: String!
  }
`;
