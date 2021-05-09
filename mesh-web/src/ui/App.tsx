import { ChakraProvider } from '@chakra-ui/react';
import { observer } from 'mobx-react';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { UserContext } from '../stores/MeshContext';
import { Home } from './components/Home/Home';
import { ProjectDashboard } from './components/Project/ProjectDashboard';
import { ProjectViewMode } from './components/Project/ProjectViewMode';
import './styles/app.css';
import theme from './styles/theme';

export const App = observer(() => {
  const UserStore = React.useContext(UserContext);
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <div>
          <Switch>
            <Route exact={true} path="/home">
              <Home />
            </Route>
            <Route exact={true} path="/">
              {UserStore.isAuthorized || UserStore.isLoading ? (
                <ProjectDashboard />
              ) : (
                <Redirect to="/home" />
              )}
            </Route>
            <Route exact={true} path="/view/:slug">
              <ProjectViewMode />
            </Route>
          </Switch>
        </div>
      </Router>
    </ChakraProvider>
  );
});
