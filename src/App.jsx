import React from 'react'
import Login from './component/login'
import HomePage from './component/homePage'
import AboutPage from './component/aboutPage'
import ExperiencePage from './component/experiencePage'
import PortfilioPage from './component/portfilioPage'
import NotePage from './component/notePage'
import styles from './app.module.scss'
// import { AuthProvider } from "../contexts/AuthContext"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


function App() {
  return (
  <Router>
    <div className={styles.app}>
      <Switch>
        <Route path="/public">
          <Login />
        </Route>
        <PrivateRoute path="/protected">
          <HomePage />
        </PrivateRoute>
      </Switch>
    </div>
  </Router>
  )
}

export default App;

// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}