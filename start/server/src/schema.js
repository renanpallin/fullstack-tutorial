const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    launches( # replace the current launches query with this one.
        """
        The number of results to show. Must be >= 1. Default = 20
        """
        pageSize: Int
        """
        If you add a cursor here, it will only return results _after_ this cursor
        """
        after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
    # Queries for the current user
    me: User
}

type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
}

type Rocket {
    id: ID!
    name: String
    type: String
}

type User {
    id: ID!
    email: String!
    trips: [Launch]!
}

type Mission {
    name: String
    missionPatch(size: PatchSize): String
}

enum PatchSize {
    SMALL
    LARGE
}

# Pagination
type LaunchConnection {
  cursor: String!
  hasMore: Boolean!
  launches: [Launch]!
}


type Mutation {
  # if false, booking trips failed -- check errors
  bookTrips(launchIds: [ID]!): TripUpdateResponse!

  # if false, cancellation failed -- check errors
  cancelTrip(launchId: ID!): TripUpdateResponse!

  login(email: String): String # login token

  missionPatch(mission: String, size: PatchSize): PatchSize
}

type TripUpdateResponse {
  success: Boolean!
  message: String
  launches: [Launch]
}
`;

module.exports = typeDefs;