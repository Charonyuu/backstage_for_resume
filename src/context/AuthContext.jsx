import React, { useContext, useState, useEffect } from "react"
import { getDoc,doc,setDoc } from "firebase/firestore"; 
import { db } from "../firebaseConfig";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [loginStatus, setLoginStatus] = useState(false)

  function login() {
    setLoginStatus(true)
  }
  const fetch_User_Data = async(type) =>{
    const querySnapshot = await getDoc(doc(db, "user",type));
    return querySnapshot.data();
  }
  const update_User_Data = async(type,data) =>{
    await setDoc(doc(db, "user", type), data);
    alert('儲存成功')
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
    fetch_User_Data,
    update_User_Data
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}