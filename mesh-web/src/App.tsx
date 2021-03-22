import React from 'react';
import {Project} from "./components/Project";
import {ChakraProvider} from "@chakra-ui/react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Home} from "./components/Home";
import theme from './theme';

function App() {
  return (
      <ChakraProvider theme={theme}>
          <Router>
              <div>
                  <Switch>
                      <Route exact path="/">
                          <Home />
                      </Route>
                      <Route exact path="/projects">
                          <Project />
                      </Route>
                  </Switch>
              </div>
          </Router>
      </ChakraProvider>
  );
}

export default App;
