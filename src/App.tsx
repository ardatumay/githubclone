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
        {/* <Home /> */}
      </GraphqlClientContext.Provider>
    </GlobalStorage>

  );
}


const Home: React.FC = () => {


  // const { state, dispatch } = React.useContext(GlobalStorageContext);

  // React.useEffect(() => {
  //   dispatch({ type: globalStorageActions.LOGIN, authToken: "test" })

  // }, [])

  // React.useEffect(() => {
  //   console.log(state)
  // }, [state])

  const [user] = useQuery(Queries.GET_AUTHENTICATED_USER)

  React.useEffect(() => {
    console.log(user)

  })

  return <div>hello
  </div>

}

export default App;
