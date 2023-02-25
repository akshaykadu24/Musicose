import { DeleteIcon } from '@chakra-ui/icons'
import { Box, Heading, Image, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers } from '../../redux/adminReducer/admin.action'
import admin from "../AdminAssets/admin.jpg";


const AllUsers = () => {
    const { users } = useSelector((store) => store.adminManager)
    const { user } = useSelector((store) => store.authManager)

    const dispatch = useDispatch()
    console.log(users)
    const AdminUser = users.filter((el) => el._id == user)
    console.log(AdminUser)
    useEffect(() => {
        showUser()
    }, [])

    const showUser = () => {
        dispatch(getUsers())
    }
    const handleDelete=(id)=>{
        dispatch(deleteUser(id))
    }
    return (
        <div>
            <Heading>AllUsers</Heading>
            <Box  width={"80%"} border= "1px solid red" margin={"auto"}>

                <SimpleGrid columns={[1, 2, 3, 4]} gap="5%" width={"80%"}>
                    {
                        users.map((el => {
                            return (

                                <div >
                                    <Box boxShadow= "rgba(0, 0, 0, 0.16) 0px 1px 4px" >
                                        <div style={{ border: "0px solid red"  }} >
                                            <Image src={admin} alt="pic" />
                                        </div>
                                        <div>
                                            <p>
                                                <span style={{fontWeight:"bold"}} >Name: </span>  {el.name}
                                            </p>
                                            <p>
                                                <span style={{fontWeight:"bold"}} >Email: </span>  {el.email}
                                            </p>
                                        </div>
                                    
                                    <div style={{color:"red"}} >
                                        <DeleteIcon
                                            onClick={() =>handleDelete(el._id)}
                                            fontSize="130%"
                                            cursor="pointer"
                                        />
                                    </div>
                                    </Box>
                                </div>
                            )
                        }))
                    }
                </SimpleGrid>
            </Box>
        </div>
    )
}

export default AllUsers