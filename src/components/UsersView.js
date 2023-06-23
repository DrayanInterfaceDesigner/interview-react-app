import React, {useState, useEffect} from 'react'
import UsersTable from "./UsersTable"

const fetchData = async(endpoint, req) => {
    try{
        const res= await fetch(endpoint, req)
        if(!res.ok) throw new Error(req.message)
        return await res.json()
    }
    catch(err) {
        throw new Error("error")
    }
}

const getUsers = async () => {
    const req = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await fetchData("https://jsonplaceholder.typicode.com/users", req)
}

const UsersView = () => {
  const [users, setUsers] = useState(null)

  const _getUsers = async() => {
      const users = await getUsers()
      setUsers(users)
  }  
  const refreshTable = () => {
      _getUsers()
  }

  useEffect(()=>{
    _getUsers()
  }, [])

  return (
    <div className='UsersView'>
      <p>UsersView</p>
      <UsersTable users={users}></UsersTable>
      <button onClick={refreshTable}>Fetch Users</button>
    </div>
  )
}

export default UsersView
