import gql from 'graphql-tag';

const registerUser = gql`
mutation postUser($user: InputUser!) {
  createUser(user: $user) {
    status
    message
    user {
      name
      password
    }
  }
}
`

const postAddVote = gql`
mutation postVote($idPublication: ID!, $idUser: ID!, $skip: Boolean!) {
  createVote(idPublication: $idPublication, idUser: $idUser) {
    status
    message
    vote @skip(if: $skip) {
      _id
      publication {
        _id
        description
        img
      }
      user {
        _id
        name
        lastName
      }
    }
  }
}
`

const deleteVote = gql`
mutation deleteVoteId($idPublication: ID!, $idUser: ID!, $skip: Boolean!) {
  deleteVote(idPublication: $idPublication, idUser: $idUser) {
    status
    message
    vote @skip(if: $skip) {
      _id
      publication {
        _id
        img
      }
      user {
        _id
        name
        lastName
      }
    }
  }
}
`

const postPublication = gql`
mutation postPublication($publication: InputPublication!, $skip: Boolean!) {
  createPublication(publication: $publication) {
    status
    message
    publication @skip(if: $skip) {
      _id
      description
      img
      createAt
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
    }
  }
}

`

export {
  registerUser,
  postAddVote,
  deleteVote,
  postPublication
}