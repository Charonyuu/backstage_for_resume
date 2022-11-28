import React, { useContext, useState, useEffect } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false)

  function login() {
    setLoginStatus(true)
  }

  // function logout() {
  //   return auth.signOut()
  // }

  // function resetPassword(email) {
  //   return auth.sendPasswordResetEmail(email)
  // }

  const value = {
    loginStatus,
    login,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}