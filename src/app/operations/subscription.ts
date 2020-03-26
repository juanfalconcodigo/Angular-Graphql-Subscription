import gql from "graphql-tag";

const changePublication = gql`
subscription ($skip:Boolean!){
  changeVotes {
    _id
    description
    img
    createAt
    user @skip(if: $skip) {
      _id
      name
      lastName
      age
      password
      email
      role
      createAt
    }
    votes
  }
}
`
export {
  changePublication
}