import gql from 'graphql-tag';

export const GET_TODO = gql`
  query todos {
    todoses(
      orderBy: rank_ASC,
      where: {
        users: {
          username: "skear"
        }
      }
    ) {
      id
      title
      content
      users {
        id
      }
      rank
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const CREATE_TODO= gql`
  mutation createPost($title: String!, $content : RichTextAST!, $iduser: ID!) {
    createPost(data: {
      title: $title
      status: PUBLISHED
      content: $content
      users: {
        connect: {
          id: $iduser
        }
      }
    }) {
      id
      users {
        name
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateGroups($idgroup: ID!, $title: String!, $dateend: DateTime!, $datestart: DateTime!, $idbanner: ID!, $status: GroupStatus!){
    updateGroups(
      where: {
        id: $idgroup
      }
      data: {
        title: $title
        dateEnd: $dateend
        dateStart: $datestart
        groupstatus: $status
        banner: {
          connect: {
            id : $idbanner
          }
        }
      }
    ) {
      id
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deletePost($id: ID!) {
    deletePost(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`