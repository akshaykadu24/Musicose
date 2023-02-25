import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/adminReducer/admin.action'
import admin from "../AdminAssets/admin.jpg";


const AdminUser = () => {
  const {users} = useSelector((store)=>store.adminManager)
  const {user} = useSelector((store)=>store.authManager)

  const dispatch = useDispatch()

  const AdminUser = users.filter((el)=>el._id==user)
  console.log(AdminUser)
  useEffect(()=>{
    showUser()
  },[])

  const showUser = ()=>{
    dispatch(getUsers())
  }
  return (
    <div>
        <Heading>AdminUser</Heading>
        <div>
            <div  >
          <Box display={"flex"} justifyContent="space-around" width='80%' margin={"auto"} marginTop={"50px"}  border={"1px solid black"} shadow="dark-lg" >
          <div style={{border:"1px solid black", marginTop:"30px", marginBottom:"30px"}} >
            <img src={admin} alt="profile"/>
          </div>
              <div >
                <Heading style={{marginTop:"50px"}}>
                  <span>Name:</span> {AdminUser[0].name}
                </Heading>
                <Heading style={{marginTop:"30px"}}>
                  <span>Email:</span> {AdminUser[0].email}
                </Heading>
              </div>
             
          </Box>
        </div>
      </div>
    </div>
  )
}

export default AdminUser