import React from 'react'
import Login from './component/login'
import HomePage from './component/homePage'
import AboutPage from './component/aboutPage'
import ExperiencePage from './component/experiencePage'
import ExperienceEditPage from './component/experienceEditPage'
import PortfilioPage from './component/portfilioPage'
import PortfilioEditPage from './component/portfilioEditPage'
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
          <PrivateRoute  path="/experience">
            <Nav>
              <ExperiencePage />
            </Nav>
          </PrivateRoute>
          <PrivateRoute  path="/experience_edit/:company_name">
            <Nav>
              <ExperienceEditPage />
            </Nav>
          </PrivateRoute>
          <Route  path="/portfilio">
            <Nav>
              <PortfilioPage />
            </Nav>
          </Route>
          <Route  path="/portfilio_edit/:portfilio_name">
            <Nav>
              <PortfilioEditPage />
            </Nav>
          </Route>
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