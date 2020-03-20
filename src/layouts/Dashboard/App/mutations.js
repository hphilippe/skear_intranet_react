import gql from 'graphql-tag';

export const GET_POST_DASHBOARD = gql`
  query postsOnlySix {
    posts(orderBy: updatedAt_DESC, first: 6) {
      id
      title
      createdAt
      updatedAt
      url
      cover {
        handle
      }
      users {
        id
        username
      }
      categories {
        id
        title
      }
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const GET_CONFIGURATIONS = gql`
  query configurations {
    configurationses{
      id
      skearcloud
      skeargit
      skearnas
      skearDigital
      skearGames
      skearCloudStatus
      skearGitStatus
      meistertask
      meistertaskStatus
      skearnasStatus
    },
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const CREATE_POST= gql`
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

export const UPDATE_POST = gql`
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

export const DELETE_POST = gql`
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