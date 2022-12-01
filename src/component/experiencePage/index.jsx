import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"
import { useAuth } from "../../context/AuthContext"
import { AiOutlineEdit,AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";


export default function ExperiencePage() {
  const { fetch_Experience_Data , delete_User_Experience_Company } = useAuth()
  const [loading,setLoading] = useState(true)
  const [data,setData] = useState()

  const handle_delete_experience = async(delete_name) => {
    const yes = confirm('確定刪除嗎？')
    if (!yes) return;
    await delete_User_Experience_Company(delete_name)
    fetch_Data();
  }

  const fetch_Data = () =>{
    setLoading(true)
    fetch_Experience_Data().then((data)=>{
      setData(data)
      setLoading(false)
    })
  }
  useEffect(()=>{
    fetch_Data();
  },[])

  return (
    <div className={styles.experience}>
      <div className={styles.title}>
        <h1>Work Experience</h1>
        <Link to={{pathname: `/experience_edit/add`}}><MdOutlineAdd/></Link>
      </div>
      {!loading &&
      <>
      {data.map((_data,idx)=>
        <div key={idx} className={styles.work_card}>
          <h2>{_data.zh_company_name}</h2>
          <h3>{_data.zh_title}</h3>
          <h4>{_data.zh_year}</h4>
          <div className={styles.button_list}>
            <Link to={{pathname: `/experience_edit/${_data.zh_company_name}`,state:_data}}><AiOutlineEdit/></Link>
            <AiOutlineDelete onClick={() => handle_delete_experience(_data.zh_company_name)}/>
          </div>
        </div>
      )}
      </>
      }
      
    </div>
  )
}
