import gql from "graphql-tag";

const login = gql`
query postLogin($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    status
    message
    user {
      _id
      name
      lastName
      age
      password
      email
      role
      createAt
    }
    token
  }
}
`

const getPublication = gql`
query getPublications($skip: Boolean!) {
  publications {
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

const meUser = gql`
query me($skip: Boolean!) {
  me {
    status
    message
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
  }
}
`
export {
  login,
  getPublication,
  meUser
}