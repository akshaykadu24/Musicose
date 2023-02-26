import React from 'react';
import {Routes,Route} from "react-router-dom";

import ProductCart from '../pages/cart/productCart';

import { AdminSideAddProducts } from '../pages/AdminPages/AdminSideAddProducts';
import AdminSideProducts from '../pages/AdminPages/AdminSideProducts';
import AdminUser from '../pages/AdminPages/AdminUser';
import AllUsers from '../pages/AdminPages/users';
import Login from '../pages/auth/Login';
import PrivateRoute from '../pages/auth/privateRoute';
import Signup from '../pages/auth/Signup';

import EarbudProducts from '../pages/earbuds/Earbuds';
import Home from '../pages/Home';

const AllRoutes = ()=>{
   return(
    <div>
        <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/earbudproduct' element={<EarbudProducts/>} ></Route>
        {/* <Route path='/products/:id' element={<SingleProduct/>}></Route> */}
        <Route path='/productCart' element={<PrivateRoute> <ProductCart/> </PrivateRoute>} ></Route>

            <Route path={"/login"} element={<Login/>}></Route>
            <Route path={"/signup"} element={<Signup/>}></Route>

            <Route path={"/earbuds"} element={ <EarbudProducts/> }></Route>
            <Route path={"/adminAddProduct"} element={<PrivateRoute> <AdminSideAddProducts/> </PrivateRoute>}></Route>
            <Route path='/adminSideProducts' element={<PrivateRoute> <AdminSideProducts/> </PrivateRoute>}></Route>
            <Route path='/user' element={<PrivateRoute> <AdminUser/> </PrivateRoute> }></Route>
            <Route path='/users' element={<PrivateRoute> <AllUsers/> </PrivateRoute>}></Route>



            


        

        </Routes>
    </div>
   )
}

export default AllRoutes