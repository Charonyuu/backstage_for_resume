import React from 'react'
import styles from "./index.module.scss"
import { useEffect, useState } from "react";
import { storage ,db } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, getDoc,doc } from "firebase/firestore"; 
export default function HomePage() {
    // const [file, setFile] = useState("");
  // const [percent, setPercent] = useState(0);
  // // Handle file upload event and update state
  // function handleChange(event) {
  //   setFile(event.target.files[0]);
  // }
  // const handleUpload = () => {
  //   if (!file) {
  //   alert("Please upload an image first!");
  //   }
  //   const storageRef = ref(storage, `${file.name}`);
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on("state_changed",(snapshot) => {
  //     const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //     setPercent(percent);
  //   },
  //   (err) => console.log(err),
  //   () => {
  //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //     console.log(url);});
  //   });
  // };
  // useEffect(()=>{
  //   const FetchData = async() =>{
  //     const querySnapshot = await getDoc(doc(db, "user","about"));
  //     console.log(querySnapshot.data()); 
  //   }
  //   FetchData();
  // },[])
  return (
    <div>
        123
        
      {/* <input type="file" onChange={handleChange} accept="/image/*" />
<button onClick={handleUpload}>Upload to Firebase</button>
<p>{percent} "% done"</p> */}
    </div>
  )
}
