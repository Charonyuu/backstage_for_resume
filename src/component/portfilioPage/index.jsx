import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"
import { useAuth } from "../../context/AuthContext"
import { AiOutlineEdit,AiOutlineDelete } from "react-icons/ai";
import { MdOutlineAdd } from "react-icons/md";
import { Link } from "react-router-dom";


export default function ExperiencePage() {
  const { fetch_portfilio_Data , delete_User_portfilio } = useAuth()
  const [loading,setLoading] = useState(true)
  const [data,setData] = useState()

  const handle_delete_portfilio = async(delete_name) => {
    const yes = confirm('確定刪除嗎？')
    if (!yes) return;
    await delete_User_portfilio(delete_name)
    fetch_Data();
  }

  const fetch_Data = () =>{
    setLoading(true)
    fetch_portfilio_Data().then((data)=>{
      setData(data)
      setLoading(false)
    })
  }
  useEffect(()=>{
    fetch_Data();
  },[])

  return (
    <div className={styles.portfilio}>
      <div className={styles.title}>
        <h1>Portfilio</h1>
        <Link to={{pathname: `/portfilio_edit/add`}}><MdOutlineAdd/></Link>
      </div>
      {!loading &&
      <>
      {data.map((_data,idx)=>
        <div key={idx} className={styles.work_card}>
           {_data.picture_list.length > 0  &&
            <div className={styles.picture}>
              <img src={_data.picture_list[0].url} alt='作品集縮圖'/> 
            </div>
          }
          <div>
            <h2>{_data.zh_portfilio_name}</h2>
            <h3>{_data.portifilio_url}</h3>
          </div>
          
          <div className={styles.button_list}>
            <Link to={{pathname: `/portfilio_edit/${_data.zh_company_name}`,state:_data}}><AiOutlineEdit/></Link>
            <AiOutlineDelete onClick={() => handle_delete_portfilio(_data.zh_portfilio_name)}/>
          </div>
        </div>
      )}
      </>
      }
      
    </div>
  )
}

