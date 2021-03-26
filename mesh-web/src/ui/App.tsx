import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './components/Home';
import { ProjectDashboard } from './components/ProjectDashboard';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route exact={true} path="/">
              <Home />
            </Route>
            <Route exact={true} path="/projects">
              <ProjectDashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
