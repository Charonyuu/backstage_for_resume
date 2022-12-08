import React, { useContext, useState, useEffect } from "react"
import { getDoc,doc,setDoc,getDocs, collection, deleteDoc } from "firebase/firestore"; 
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
  const fetch_User_Doc_Data = async(type) =>{
    const querySnapshot = await getDoc(doc(db, "user",type));
    return querySnapshot.data();
  }
  const update_User_Doc_Data = async(type,data) =>{
    await setDoc(doc(db, "user", type), data);
    alert('儲存成功')
  }
  const fetch_Experience_Data = async() =>{
    const querySnapshot = await getDocs(collection(db, "user", 'experience','experience_list'));
    let array = []
    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });
    return array;
  }
  const update_User_Experience_Data = async(update_name,data) =>{
    await setDoc(doc(db, "user", 'experience','experience_list',update_name), data);
    alert('儲存成功')
  }
  const delete_User_Experience_Company = async(delete_name)=>{
    await deleteDoc(doc(db, "user", 'experience','experience_list',delete_name))
    alert('刪除成功')
  }
  const fetch_portfilio_Data = async() =>{
    const querySnapshot = await getDocs(collection(db, "user", 'portfilio','portfilio_list'));
    let array = []
    querySnapshot.forEach((doc) => {
      array.push(doc.data());
    });
    return array;
  }
  const update_User_portfilio_Data = async(update_name,data) =>{
    await setDoc(doc(db, "user", 'portfilio','portfilio_list',update_name), data);
    alert('儲存成功')
  }
  const delete_User_portfilio = async(delete_name)=>{
    await deleteDoc(doc(db, "user", 'portfilio','portfilio_list',delete_name))
    alert('刪除成功')
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
    fetch_User_Doc_Data,
    update_User_Doc_Data,
    fetch_Experience_Data,
    update_User_Experience_Data,
    delete_User_Experience_Company,
    fetch_portfilio_Data,
    update_User_portfilio_Data,
    delete_User_portfilio,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}