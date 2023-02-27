import { Box, Button, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Routes,Route, Link, Navigate, useNavigate} from "react-router-dom";
import { logoutAction } from '../../redux/authReducer/auth.action';


const AdminNavbar = ({setAdminBar})=>{
    const {isAuth} = useSelector((store=>store.authManager))
    const Navigate = useNavigate()
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    const handleLogout =()=>{
      dispatch(logoutAction)
      setAdminBar(false)
      Navigate("/")
    }
    
   return(
    <div style={{ backgroundColor:"black", color:"white"}}>
    <Box style={{display:'flex', justifyContent:"space-around", marginTop:"-10px", marginBottom:"-10px",alignItems:"center", fontWeight:"bold" , margin:"auto" ,paddingTop:'5px'}}>
    <Box>
            <Link to={"/"} onClick={()=>setAdminBar(false)}>
              <Image
                padding={"15px"}
                width={"200px"}
                marginLeft={"20px"}
                marginTop={"-10px"}
                marginBottom={"-10px"}
                src={"musicoseLogoWhite.png"}
                alt="musicose"
              />
            </Link>
          </Box>

        <Box ><Link to={"/adminSideProducts"}><Heading size={"md"}>All-Products</Heading></Link></Box> &nbsp;
        <Box ><Link to={"/adminAddProduct"}><Heading size={"md"}>AdminAddProduct</Heading></Link></Box> &nbsp;
        <Box ><Link to={"/alluser"}><Heading size={"md"}>AllUsers</Heading></Link></Box> &nbsp;
        <Box ><Link to={"/user"}><Heading size={"md"}>User (Me)</Heading></Link></Box> &nbsp;
        {
            isAuth||token? <Button onClick={()=>handleLogout()} color={"black"}>Logout</Button>:""

        }
    </Box>
    </div>
   )
}

export default AdminNavbar