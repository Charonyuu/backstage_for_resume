import React from 'react'
import Login from './component/login'
import HomePage from './component/homePage'
import AboutPage from './component/aboutPage'
import ExperiencePage from './component/experiencePage'
import ExperienceEditPage from './component/experienceEditPage'
import PortfilioPage from './component/portfilioPage'
import NotePage from './component/notePage'
import styles from './app.module.scss'
import { useAuth,AuthProvider } from "./context/AuthContext"
import Nav from './component/nav'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


function App() {
  return (
  <Router>
    <div className={styles.app}>
      <AuthProvider>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Nav>
              <HomePage />
            </Nav>
          </Route>
          <PrivateRoute  path="/about">
            <Nav>
              <AboutPage />
            </Nav>
          </PrivateRoute>
          <Route  path="/experience">
            <Nav>
              <ExperiencePage />
            </Nav>
          </Route>
          <Route  path="/edit/:company_name">
            <Nav>
              <ExperienceEditPage />
            </Nav>
          </Route>
          <PrivateRoute  path="/portfilio">
            <Nav>
              <PortfilioPage />
            </Nav>
          </PrivateRoute>
          <PrivateRoute  path="/note">
            <Nav>
              <NotePage />
            </Nav>
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </div>
  </Router>
  )
}

export default App;

// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const { loginStatus } = useAuth()
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loginStatus ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}