import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"
import { useAuth } from "../../context/AuthContext"
import { AiOutlineEdit,AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";


export default function ExperiencePage() {
  const { fetch_Experience_Data } = useAuth()
  const [data,setData] = useState([{
      sort: 0,
      zh_company_name:'',en_company_name:'',
      zh_title:'',en_title:'',
      zh_year:'',en_year:'',
      zh_introduction:'',zh_introduction:'',
      tools:[],
      exhibit: []
    }
  ])
  
  useEffect(()=>{
    fetch_Experience_Data().then((data)=>{
      setData(data)
      console.log(data);
    })
  },[])
  return (
    <div className={styles.experience}>
      <div className={styles.title}>
        <h1>Work Experience</h1>
        <MdOutlineAdd/>
      </div>
      {data.map((_data,idx)=>
        <div key={idx} className={styles.work_card}>
      {console.log(_data)}
          <h2>{_data.zh_company_name}</h2>
          <h3>{_data.zh_title}</h3>
          <h4>{_data.zh_year}</h4>
          <div className={styles.button_list}>
            <Link to={{pathname: `/edit/${_data.zh_company_name}`,state:_data}}><AiOutlineEdit/></Link>
            <AiOutlineDelete/>
          </div>
        </div>
      )}
      
    </div>
  )
}
