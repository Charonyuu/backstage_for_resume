import styles from './index.module.scss'

export function Input({title,value,func,setting}) {
  return (
    <>
        <p>{title}</p>
        <input className={!setting && styles.notSetting} type={'text'} value={value} onChange={func}/>
    </>
  )
}

export function Row_Input({title,value,func,setting}) {
  return (
    <div className={styles.row_item}>
        <p>{title}</p>
        <input className={!setting && styles.notSetting} type={'text'} value={value} onChange={func} readOnly={!setting}/>
    </div>
  )
}

export function Textarea({title,value,func,setting}) {
  return (
    <>
        <p>{title}</p>
        <textarea 
            className={!setting && styles.notSetting}
            value={value}
            onChange={func}
            readOnly={!setting}
        />
    </>
  )
}

export function Picture_List({data}) {
    const dataArray = data || []
  return (
    <div className={styles.picture_list}>
        {dataArray.length > 0 ?
        dataArray.map((_data,idx)=>
            <div className={styles.picture} key={idx}>
                <img src={_data.url} alt={_data.name} />
            </div>
        )
        :
        <p>暫時無照片</p>
        }
    </div>
  )
}

export function Small_Btn({title,func}) {
    
  return (
    <div className={styles.btn} onClick={func}>{title}</div>
  )
}

export function Modal({children}) {
  return (
    <div className={styles.modal__backdrop}>
        {children}
    </div>
  )
}