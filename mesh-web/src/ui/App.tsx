import { ChakraProvider } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  NetworkContext,
  NetworkStore,
  ProjectContext,
  ProjectStore,
} from '../stores/MeshContext';
import { Home } from './components/Home';
import { ProjectDashboard } from './components/Project/ProjectDashboard';
import theme from './styles/theme';

export const App = observer(() => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route exact={true} path="/">
              <Home />
            </Route>
            <Route exact={true} path="/projects">
              <NetworkContext.Provider value={NetworkStore}>
                <ProjectContext.Provider value={ProjectStore}>
                  <ProjectDashboard />
                </ProjectContext.Provider>
              </NetworkContext.Provider>
            </Route>
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
});
