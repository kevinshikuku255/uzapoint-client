import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import ApolloProvider from "./Utils/Apolloprovider"

ReactDOM.render(
 ApolloProvider,
  document.getElementById('root')
);

serviceWorker.register();

