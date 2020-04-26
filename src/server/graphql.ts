import { gql } from "apollo-server-express";
import { Carrier, Coverage, State, Type } from "./db";
import { Sequelize } from "sequelize";

export const typeDefs = gql`
  type Coverage {
    state: String!
    type: String!
    carrier: String!
  }

  input CoverageI {
    state: String
    type: String
  }

  type Query {
    coverage(params: CoverageI): [Coverage]
  }
`;

export const resolvers = {
  Query: {
    coverage: async (_: any, args: any): Promise<any> => {
      return Coverage.findAll({
        raw: true,
        attributes: [
          [Sequelize.col("state.name") as any, "state"],
          [Sequelize.col("type.name") as any, "type"],
          [Sequelize.col("carrier.name") as any, "carrier"]
        ],
        where: {
          ...(args.params.state ? { "$State.name$": args.params.state } : {}),
          ...(args.params.type ? { "$Type.name$": args.params.type } : {})
        },
        include: [
          {
            model: State
          },
          {
            model: Type
          },
          {
            model: Carrier
          }
        ]
      });
    }
  }
};
