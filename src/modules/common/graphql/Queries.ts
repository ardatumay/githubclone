import gql from 'graphql-tag';
import { SearchType } from './enums';
import { REPOSITORY_FIELDS, PAGE_INFO_FIELDS } from './Fragments';

export const GET_USER_BY_LOGIN = gql`query GetUserByLogin($login: String!) 
  { 
    user(login: $login) { 
      login
      name
      location
    }
  }`

export const GET_AUTHENTICATED_USER = gql`query GetAuthenticatedUser 
  { 
    viewer { 
      login
      name
      location
    }
  }`

export const GET_REPOSITORY_WATCHER_COUNT = gql`query GetRepositoryWatcherCount($id: ID!) 
  { 
    node (id: $id) {
      ... on Repository {
        watchers {
        totalCount
        }
      }
    }
  }`

// Search fields can be parametrized via additional parameters and use of directives on fragments. Potential types -> ISSUE, REPOSITORY, USER, DISCUSSION
const search = (type) => {

  return gql`${REPOSITORY_FIELDS}${PAGE_INFO_FIELDS}  
  query Search($type: SearchType = ${type}, $query: String!, $first: Int, $last: Int, $after: String, $before: String, $languageCountToFetch: Int!) {
    search(type: $type, query: $query, first: $first, last: $last, after: $after, before: $before) {
      repositoryCount
      ... pageInfo
      edges {
        cursor
        node {
          ... Repository 
        }
      }
    }
  }`

}


export const GET_REPOSITORY = search(SearchType.REPOSITORY)


