import gql from 'graphql-tag';

export const GET_POSTS = gql`
  query posts($idcategorie: ID!) {
    posts(
      orderBy: updatedAt_DESC, 
      where: {categories: {id: $idcategorie}}
    ) {
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
    }
  }
`;

export const GET_POST = gql`
  query posts($id: ID!) {
    posts(where: {id: $id}) {
      id
      title
      createdAt
      updatedAt
      content
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
    }
    postsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
query categories {
  categorieses(where: {id: "cjsk1rl7yahnw0c15wz1pcmg9"}) {
    status
    updatedAt
    createdAt
    id
    title
    logo {
      handle
    }
    categorieses {
      id
      title
      logo {
        handle
      }
      categorieses {
        id
        title
        logo {
          handle
        }
        categorieses {
          id
          title
          logo {
            handle
          }
          categorieses {
            id
            title
            logo {
              handle
            }
            categorieses {
              id
              title
              logo {
                handle
              }
              categorieses {
                id
                title
                logo {
                  handle
                }
              }
            }
          }
        }
      }
    }
    categories {
      id
      title
    }
  }
}
`;

export const GET_ALL_CATEGORIES = gql`
query categories {
  categorieses {
    id
    title
    logo {
      handle
    }
  }
}
`;

export const CREATE_POST= gql`
  mutation createPost($title: String!, $content : String!, $iduser: ID!, $idcat: ID!, $url: String!) {
    createPost(data: {
      title: $title
      status: PUBLISHED
      content: $content
      url: $url
      users: {
        connect: {
          id: $iduser
        }
      }
      categories: {
        connect: {
          id: $idcat
        }
      }
    }) {
      id
      title
    }
  }
`;

export const CREATE_CATEGORIES= gql`
  mutation createCategories($title: String!, $idcategories: ID!) {
    createCategories(data: {
      title: $title
      status: PUBLISHED
      categories: {
				connect:{
          id: $idcategories
        }
      }
    }) {
      id
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String!, $content : String!, $iduser: ID!, $idcat: ID!, $url: String!) {
    updatePost(
      where: {
        id: $id
      }
      data: {
      title: $title
      status: PUBLISHED
      content: $content
      url: $url
      users: {
        connect: {
          id: $iduser
        }
      }
      categories: {
        connect: {
          id: $idcat
        }
      }
    }) {
      id
      title
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

export const DELETE_CATEGORIES = gql`
  mutation deleteCategories($id: ID!) {
    deleteCategories(
      where: {
        id: $id
      }
    ) {
      id
    }
  }
`