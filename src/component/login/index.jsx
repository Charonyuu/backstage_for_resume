import {useRef, useState} from 'react'
import styles from "./index.module.scss"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebaseConfig';


function Login() {
  const [error,setError] = useState('')
  const account_input = useRef(null) 
  const password_input = useRef(null) 
  const handleSubmit =() =>{
    if(!account_input.current.value || !password_input.current.value) return setError('請輸入帳號或密碼')
    setError('')
    signInWithEmailAndPassword(auth, account_input.current.value, password_input.current.value)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      setError('密碼錯誤')
    });
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>LOGIN PAGE</h2>
        <h3>Account</h3>
        <input type={'text'} ref={account_input} placeholder='請輸入帳號'/>
        <h3>Password</h3>
        <input type={'password'} ref={password_input} placeholder='請輸入密碼'/>
        <p>{error}</p>
        <div className={styles.btn} onClick={handleSubmit}>
          Login
        </div>
      </div>
    </div>
  );
}

export default Login;