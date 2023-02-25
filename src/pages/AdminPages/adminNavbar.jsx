import { Box, Button, Heading } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import {Routes,Route, Link} from "react-router-dom";
import { logoutAction } from '../../redux/authReducer/auth.action';


const AdminNavbar = ()=>{
    const dispatch = useDispatch()
   return(
    <div style={{ backgroundColor:"gray"}}>
    <Box style={{display:'flex', justifyContent:"space-around",  fontWeight:"bold" ,width:"60%", margin:"auto" ,paddingTop:'5px'}}>
        <Link to={"/login"}><Heading size={"md"}>Login</Heading> </Link> &nbsp;
        <Link to={"/signup"}><Heading size={"md"}>SignUp</Heading> </Link> &nbsp;

        <Link to={"/earbuds"}><Heading size={"md"}>Earbuds</Heading></Link> &nbsp;
        <Link to={"/adminAddProduct"}><Heading size={"md"}>AdminAddProduct</Heading></Link> &nbsp;
        <Link to={"/adminSideProducts"}><Heading size={"md"}>All Products</Heading></Link> &nbsp;
        <Link to={"/user"}><Heading size={"md"}>User</Heading></Link> &nbsp;
        <Link to={"/users"}><Heading size={"md"}>AllUsers</Heading></Link> &nbsp;
        <Button onClick={()=>{dispatch(logoutAction)}}>Logout</Button>

    </Box>
    </div>
   )
}

export default AdminNavbar