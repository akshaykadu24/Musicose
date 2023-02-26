import { Box, Button, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Routes,Route, Link} from "react-router-dom";
import { logoutAction } from '../../redux/authReducer/auth.action';


const AdminNavbar = ()=>{
    const {isAuth} = useSelector((store=>store.authManager))
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()
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

        <Box><Link to={"/earbuds"}><Heading size={"md"}>Earbuds</Heading></Link></Box> &nbsp;
        <Box ><Link to={"/adminAddProduct"}><Heading size={"md"}>AdminAddProduct</Heading></Link></Box> &nbsp;
        <Box ><Link to={"/adminSideProducts"}><Heading size={"md"}>All-Products</Heading></Link></Box> &nbsp;
        <Box ><Link to={"/user"}><Heading size={"md"}>User</Heading></Link></Box> &nbsp;
        <Box ><Link to={"/users"}><Heading size={"md"}>AllUsers</Heading></Link></Box> &nbsp;
        {
            isAuth||token? <Button onClick={()=>{dispatch(logoutAction)}} color={"black"}>Logout</Button>:""

        }
    </Box>
    </div>
   )
}

export default AdminNavbar