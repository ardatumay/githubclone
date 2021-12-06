import React from 'react';
import { GraphqlClientContext, useLazyQuery, useMutation, useQuery } from './modules/graphqlClient';
import { configureAxiosInterceptors, githubGraphqlUri } from './modules/config';
import { GlobalStorage, globalStorageActions, GlobalStorageContext, Mutations, Queries, SubscriptionState, useConstructor } from './modules/common';
import './App.scss';

// TODO: 1) pagination 2) 404 fallback ui and fallback to login ui 3) axios interceptor for bad credentials 4) check pat scopes 5) login logout screens 6) login validation by wiever request



function App() {

  useConstructor(configureAxiosInterceptors)

  return (
    <GlobalStorage>
      <GraphqlClientContext.Provider value={{ uri: githubGraphqlUri, authToken: "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" }} >
        <Home />
      </GraphqlClientContext.Provider>
    </GlobalStorage>

  );
}

const useFetchListPagination = (requestVariables, query, pageSize) => {

  const defaultParameters = React.useRef({
    first: pageSize,
    after: null,
    before: null
  })

  const [nextPageParameters, setNextPageParameters] = React.useState<object>(defaultParameters)
  const [prevPageParameters, setPrevPageParameters] = React.useState<object>(defaultParameters)

  const [req, data, loading, error] = useLazyQuery(query, {
    ...requestVariables,
    ...nextPageParameters,
  })

  React.useEffect(() => {
    req()
  }, [])

  React.useEffect(() => {
    if (!!data) {
      let pageInfo = data.search.pageInfo

      let nextPageParameters = {
        first: pageSize,
        after: pageInfo.endCursor,
        before: null
      }
      setNextPageParameters(nextPageParameters)

      let prevPageParameters = {
        first: pageSize,
        after: null,
        before: pageInfo.startCursor
      }
      setPrevPageParameters(prevPageParameters)
    }
  }, [data])

  let requestNextPage = (customVariables) => req({
    ...requestVariables,
    ...nextPageParameters,
    ...customVariables
  })

  let requestPreviousPage = (customVariables) => req({
    ...requestVariables,
    ...prevPageParameters,
    ...customVariables
  })

  return [requestNextPage, requestPreviousPage, data, loading, error]

}

const Home: React.FC = () => {


  // const [userData, userDataLoading, userDataError] = useQuery(Queries.GET_AUTHENTICATED_USER)
  const [req, repoData, repoDataLoading, repoDataError] = useLazyQuery(Queries.GET_REPOSITORY, {
    // "query": "language:JavaScript stars:>10000", 
    query: "tedu in:name,description,readme",
    first: 4,
    languageCountToFetch: 3
  })

  // const [addStar, data, addStarLoading, addStarError] = useMutation(Mutations.ADD_STAR, {
  //   input: {
  //     starrableId: "R_kgDOGa0MDA"
  //   }
  // })

  // const [remStar, remData, remStarLoading, remStarError] = useMutation(Mutations.REMOVE_STAR, {
  //   input: {
  //     starrableId: "R_kgDOGa0MDA"
  //   }
  // })

  // const [updateSubs, updateSubsData, updateSubsLoading, updateSubsError] = useMutation(Mutations.UPDATE_SUBSCRIPTION)

  const getUpdateSubscribeRequestData = (state) => {
    return {
      input: {
        subscribableId: "R_kgDOGa0MDA",
        state: state
      }
    }
  }

  // const { state, dispatch } = React.useContext(GlobalStorageContext);

  // React.useEffect(() => {
  //   dispatch({ type: globalStorageActions.LOGIN, authToken: "test" })

  // }, [])

  // React.useEffect(() => {
  //   console.log(state)
  // }, [state])

  React.useEffect(() => {


  }, [repoData])

  // React.useEffect(() => {
  //   console.log(data)
  // }, [addStarLoading])

  // React.useEffect(() => {
  //   console.log(remData)
  // }, [remStarLoading])

  // React.useEffect(() => {
  //   console.log({ updateSubsData, updateSubsError })
  // }, [updateSubsLoading])

  return <div>hello
    {/* <button onClick={() => addStar()} > Add Star</button> */}
    {/* <button onClick={() => remStar()} > Remove Star</button> */}
    {/* <button onClick={() => updateSubs(getUpdateSubscribeRequestData(SubscriptionState.SUBSCRIBED))} > Subscribe Repo</button> */}
    {/* <button onClick={() => updateSubs(getUpdateSubscribeRequestData(SubscriptionState.UNSUBSCRIBED))} > Unsubscribe Repo</button> */}
    <button onClick={() => req()} > Unsubscribe Repo</button>
    <button onClick={() => req()} > Unsubscribe Repo</button>
  </div>

}

export default App;
