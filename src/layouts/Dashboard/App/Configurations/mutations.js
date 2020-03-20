import gql from 'graphql-tag';

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