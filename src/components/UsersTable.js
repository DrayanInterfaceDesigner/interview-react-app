import React,  {useState, useEffect} from 'react'
import Notification from './Notification'

const UsersTable = ({users}) => {
  const [_usersTD, setUsersTD] = useState()
  const [notification, setNotification] = useState(false)
  const [userJustRemovedName, setUserJustRemovedName] = useState(null)

  const showNotification = (name) => {
    setUserJustRemovedName(name)
    setNotification(true)
  }

  const removeUser = (index)=> {
    const username = _usersTD.filter((_, i) => i == index).pop().name
    showNotification(username)
    setUsersTD(((prevRows) => prevRows.filter((_, i) => i !== index)))
  }

  const resetNotificationOnClose = () => {
    setNotification(false)
  }

  useEffect(()=> {
    if(users) {
        setUsersTD([...users])
    }
  }, [users])

  return (
    <div className='UsersTable'>
        {notification && 
        <Notification 
        name={userJustRemovedName} 
        onClose={resetNotificationOnClose}>
        </Notification>
        }
        <table className='UsersTable__table'>
        <thead>
            <tr>
                <th>name</th>
                <th>email</th>
                <th>company</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        {
            _usersTD !=null &&
            _usersTD.map((user, index) => {
                return (
                    <tr key={index}>
                        <td>{user?.name}</td>
                        <td>{user?.email}</td>
                        <td>{user?.company?.name}</td>
                        <td><button type='button' onClick={()=> {removeUser(index)}}>X</button></td>
                    </tr>
                )
            })
        }
        </tbody>
    </table>
    </div>
  )
}

export default UsersTable
