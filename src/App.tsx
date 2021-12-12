import { initializeApp } from "firebase/app";
import { GraphqlClient, } from './modules/graphqlClient';
import { configureAxiosInterceptors, githubGraphqlUri, routeConfig } from './modules/config';
import { GlobalStorage, useConstructor } from './modules/common';
import { withRouterComponent } from './modules/navigation/HOCs/WithRouterComponent';
import { Main } from './modules/main';
import 'antd/dist/antd.css';
import './App.scss';

const MainWithRoutes = withRouterComponent(Main, routeConfig)

function App() {

  useConstructor(configureAxiosInterceptors)

  const firebaseConfig = {
    apiKey: "AIzaSyCr7DsoJvGGSJxTj9JQjBEI5m7zKcmT9Ls",
    authDomain: "githubclone-ad2ab.firebaseapp.com",
    projectId: "githubclone-ad2ab",
    storageBucket: "githubclone-ad2ab.appspot.com",
    messagingSenderId: "857653931978",
    appId: "1:857653931978:web:ff6b012f8d2195806be933"
  };

  initializeApp(firebaseConfig);

  return (
    <GlobalStorage>
      <GraphqlClient url={githubGraphqlUri} >
        <MainWithRoutes />
      </GraphqlClient>
    </GlobalStorage>

  );
}

export default App;
