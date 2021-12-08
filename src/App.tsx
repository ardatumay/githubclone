import React from 'react';
import { GraphqlClientContext, useLazyQuery, useMutation, useQuery } from './modules/graphqlClient';
import { configureAxiosInterceptors, githubGraphqlUri } from './modules/config';
import { GlobalStorage, globalStorageActions, GlobalStorageContext, Mutations, Queries, SubscriptionState, useConstructor, useFetchListWithPagination } from './modules/common';
import { Main } from './modules/main';
import 'antd/dist/antd.css';
import './App.scss';

// TODO: 1) pagination 2) 404 fallback ui and fallback to login ui 3) axios interceptor for bad credentials 4) check pat scopes 5) login logout screens 6) login validation by wiever request


function App() {

  useConstructor(configureAxiosInterceptors)

  return (
    <GlobalStorage>
      <GraphqlClientContext.Provider value={{ uri: githubGraphqlUri, authToken: "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" }} >
        <Main />
      </GraphqlClientContext.Provider>
    </GlobalStorage>

  );
}


// const Home: React.FC = () => {


//   // const { state, dispatch } = React.useContext(GlobalStorageContext);

//   // React.useEffect(() => {
//   //   dispatch({ type: globalStorageActions.LOGIN, authToken: "test" })

//   // }, [])

//   // React.useEffect(() => {
//   //   console.log(state)
//   // }, [state])

//   React.useEffect(() => {
//     console.log(data?.search?.pageInfo)
//     console.log(error)

//   }, [loading])

//   const renderRepositories = () => {

//     return data.search.edges.map((edge) => {
//       return (
//         <li>{edge.node.name}</li>
//       )
//     })
//   }

//   // React.useEffect(() => {
//   //   console.log(data)
//   // }, [addStarLoading])

//   // React.useEffect(() => {
//   //   console.log(remData)
//   // }, [remStarLoading])

//   // React.useEffect(() => {
//   //   console.log({ updateSubsData, updateSubsError })
//   // }, [updateSubsLoading])

//   return <div>hello
//     {/* <button onClick={() => addStar()} > Add Star</button> */}
//     {/* <button onClick={() => remStar()} > Remove Star</button> */}
//     {/* <button onClick={() => updateSubs(getUpdateSubscribeRequestData(SubscriptionState.SUBSCRIBED))} > Subscribe Repo</button> */}
//     {/* <button onClick={() => updateSubs(getUpdateSubscribeRequestData(SubscriptionState.UNSUBSCRIBED))} > Unsubscribe Repo</button> */}
//     <ul>
//       {data?.search?.edges.length && renderRepositories()}
//     </ul>
//     <button onClick={() => requestPreviousPage()} > prev page</button>
//     <button onClick={() => requestNextPage()} > next page</button>

//   </div>

// }

export default App;
