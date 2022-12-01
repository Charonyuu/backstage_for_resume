import React, { useEffect, useRef, useState } from 'react'
import styles from "./index.module.scss"
import { useAuth } from "../../context/AuthContext"
import { Input,Row_Input,Small_Btn ,Textarea ,Modal} from '../things'
import { useLocation } from 'react-router-dom'
import { AiOutlineRight,AiFillDelete } from "react-icons/ai";

export default function ExperienceEditPage() {
  const {update_User_Experience_Data} = useAuth()
  const [data,setData] = useState()
  const [modalOpen,setModalOpen] = useState({open: false, id: '',data:null})
  const tool_ref = useRef(null)
  const exhibit_web_name_ref = useRef(null)
  const exhibit_web_url_ref = useRef(null)
  const exhibit_web_content_ref = useRef(null)


  const [input,setInput] =useState({
      sort: 0,
      zh_company_name:'',en_company_name:'',
      zh_title:'',en_title:'',
      zh_year:'',en_year:'',
      zh_introduction:'',en_introduction:'',
      tools:[],
      exhibit: []
    })
  const [isSetting,setIsSetting] = useState(false)
  const location = useLocation()
  useEffect(()=>{
    const state_data = location.state || {
      sort: 0,
      zh_company_name:'',en_company_name:'',
      zh_title:'',en_title:'',
      zh_year:'',en_year:'',
      zh_introduction:'',zh_introduction:'',
      tools:[],
      exhibit: []
    }
    console.log(state_data);
    setData(state_data)
    setInput(state_data)
    console.log(input);
  },[])

  const handle_reset = () =>{
    setInput(data)
    setIsSetting(false)
  }

  const handle_save = ()=>{
    update_User_Experience_Data(input.zh_company_name,input)
    setIsSetting(false)
  }

  const handle_modal_close = () =>{
    setModalOpen({open:false,id:''})
  }

  const handle_exhibit_save = () =>{
    if (!exhibit_web_name_ref.current.value ) return;
    const temp = [...input.exhibit]
    temp.push({name:exhibit_web_name_ref.current.value,url:exhibit_web_url_ref.current.value,content:exhibit_web_content_ref.current.value})
    setInput({ ...input, exhibit: temp })
    alert('儲存成功')
    handle_modal_close()
  }

  const handle_tool_save = () =>{
    if (!tool_ref.current.value ) return;
    const temp = [...input.tools]
    temp.push(tool_ref.current.value)
    setInput({ ...input, tools: temp })
    alert('儲存成功')
    handle_modal_close()
  } 

  const handle_delete_tool = (tool_name) =>{
    const yes = confirm('你確定嗎？');
    if (!yes) return;
    const temp = [...input.tools]
    const result = temp.filter((tool)=> tool !== tool_name)
    setInput({ ...input, tools: result })
  }

  const handle_delete_exhibit = (exhibit_name) =>{
    const yes = confirm('你確定嗎？');
    if (!yes) return;
    const temp = [...input.exhibit]
    const result = temp.filter((exhibit)=> exhibit.name !== exhibit_name)
    setInput({ ...input, exhibit: result })
  }

  return  (
    <div className={styles.home}>
        <h1>工作經歷修改</h1>
        <div className={styles.form}>
          
          <div className={styles.row}>
              <Row_Input title={'中文公司名稱'} setting={isSetting} value={input.zh_company_name} func={(e) => setInput({ ...input, zh_company_name: e.target.value })}/>
              <Row_Input title={'英文公司名稱'} setting={isSetting} value={input.en_company_name} func={(e) => setInput({ ...input, en_company_name: e.target.value })}/>
          </div>
          <div className={styles.row}>
            <Row_Input title={'中文公司職位'} setting={isSetting} value={input.zh_title} func={(e) => setInput({ ...input, zh_title: e.target.value })}/>
            <Row_Input title={'英文公司職位'} setting={isSetting} value={input.en_title} func={(e) => setInput({ ...input, en_title: e.target.value })}/>
          </div>
          <Textarea title={'中文公司簡介'} setting={isSetting} value={input.zh_introduction} func={(e) => setInput({ ...input, zh_introduction: e.target.value })}/>
          <Textarea title={'英文公司簡介'} setting={isSetting} value={input.en_introduction} func={(e) => setInput({ ...input, en_introduction: e.target.value })}/>
          <div className={styles.tool_title}>
            使用工具
            {isSetting && <AiOutlineRight onClick={()=>setModalOpen({open:true,id:'tool',data:null})}/>}
          </div>
          <div className={styles.tool_list}>
            {input.tools.map((tool,idx) =>
              <div className={styles.tool} key={idx}>
                {tool}
                {isSetting &&<AiFillDelete onClick={()=>handle_delete_tool(tool)}/>}
              </div>
            )}
          </div>

          <div className={styles.tool_title}>
            公司內專案
             {isSetting && <AiOutlineRight onClick={()=>setModalOpen({open:true,id:'exhibit',data:null})}/>}
          </div>
          <div className={styles.exhibit_list}>
            {input.exhibit.length > 0 && input.exhibit.map((exhibit_item,idx) =>
              <div className={styles.exhibit} key={idx}>
                <p ><span className={styles.exhibit_name}>{exhibit_item.name} </span>{exhibit_item.url}</p>
                <p className={styles.exhibit_url}></p>
                <p>{exhibit_item.content}</p>
                {isSetting &&<AiFillDelete onClick={()=>handle_delete_exhibit(exhibit_item.name)}/>}
              </div>
            )}
          </div>

          <div className={styles.button_row}>
            {!isSetting ?
              <Small_Btn title='修改' func={()=>setIsSetting(true)}/>
            :
            <>
              <Small_Btn title='取消' func={handle_reset}/>
              <Small_Btn title='儲存' func={handle_save}/>
            </>
             }
          </div>


             {/* modal */}
          {modalOpen.open && <Modal>
            {modalOpen.id === 'tool' ?
              <div className={styles.modal}>
                <h2>增加工具</h2>
                <p>工具名稱:</p>
                <input type="text" ref={tool_ref} placeholder='請輸入工具名稱'/>
                <div className={styles.button_row}>
                  <Small_Btn title='取消' func={handle_modal_close}/>
                  <Small_Btn title='儲存' func={handle_tool_save}/>
                </div>
              </div>
              :
              <div className={styles.modal}>
                <h2>增加展示頁面</h2>
                <p>網頁名稱:</p>
                <input type="text" ref={exhibit_web_name_ref} placeholder='請輸入網頁名稱'/>
                <p>網頁網址:</p>
                <input type="text" ref={exhibit_web_url_ref} placeholder='請輸入網頁網址'/>
                <p>網頁大綱:</p>
                <textarea ref={exhibit_web_content_ref} placeholder='請輸入網頁內容'/>

                <div className={styles.button_row}>
                  <Small_Btn title='取消' func={handle_modal_close}/>
                  <Small_Btn title='儲存' func={handle_exhibit_save}/>
                </div>
              </div>
            } 
          </Modal>}
        </div>
    </div>
  )
}