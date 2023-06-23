import React, {useEffect, useState} from 'react'
import '../styles/Notification.css'

const Notification = ({name, onClose}) => {
  const [isActive, setIsActive] = useState(true)
  const [timer, setTimer] = useState(null)
  let timeout = null

  useEffect(()=> {
    clearTimeout(timer)
    
    setTimer(
    setTimeout(()=> {
        setIsActive(false)
        onClose()
    }, 2000))
    
    return ()=> {clearTimeout(timeout)}
  },[name])

  return (
    <div className='Notification'>
      <div className='Notification__alert__modal'>
        {isActive && <p className='Notification__alert'>{name} has been removed succesfully.</p>}
      </div>
    </div>
  )
}

export default Notification
