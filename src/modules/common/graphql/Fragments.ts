import gql from 'graphql-tag';

export const REPOSITORY_FIELDS = gql`fragment Repository on Repository 
{
  id
  name
  url
  description
  languages (first: $languageCountToFetch)  {
    edges {
      size
    }
    nodes {
      name
      color
    }
  }
  primaryLanguage {
    color
    name
  }
  nameWithOwner
  stargazerCount 
  forkCount
  viewerHasStarred 
  viewerSubscription 
  watchers {
    totalCount 
  }
  licenseInfo  {
    name 
  }
  updatedAt
}`

export const PAGE_INFO_FIELDS = gql`fragment pageInfo on SearchResultItemConnection 
{
  pageInfo {
    startCursor 
    endCursor 
    hasNextPage 
    hasPreviousPage 
  }
}`