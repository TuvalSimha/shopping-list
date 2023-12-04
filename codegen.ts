import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:4000/graphql",
  documents: ["client/src/**/*.tsx"],
  ignoreNoDocuments: true,
  generates: {
    "./client/src/gql/": {
      preset: "client",
    },
    "./server/__generated__/type-resolvers.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
      },
    },
  },
};

export default config;
