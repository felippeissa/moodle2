import { ApolloProvider } from "@apollo/client"
import { Provider } from "react-redux"
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom"
import { Router } from "./components/Router"
import { client } from "./lib/apollo"

function App() {

  return (

      <ApolloProvider client={client}>
        <BrowserRouter>
        <Provider store={store}>
          <Router />
        </Provider>
        </BrowserRouter>
      </ApolloProvider>
  )
}

export default App