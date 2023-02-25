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
import SingleProduct from '../pages/single-product/SingleProduct';

const AllRoutes = ()=>{
   return(
    <div>
        <Routes>

        <Route path='/earbudproduct' element={<EarbudProducts/>} ></Route>
        <Route path='/products/:id' element={<SingleProduct/>}></Route>
        <Route path='/productCart' element={<ProductCart/>} ></Route>

            <Route path={"/login"} element={<Login/>}></Route>
            <Route path={"/signup"} element={<Signup/>}></Route>

            <Route path={"/earbuds"} element={ <EarbudProducts/> }></Route>
            <Route path={"/adminAddProduct"} element={<PrivateRoute> <AdminSideAddProducts/> </PrivateRoute>}></Route>
            <Route path='/adminSideProducts' element={<AdminSideProducts/>}></Route>
            <Route path='/user' element={<AdminUser/>}></Route>
            <Route path='/users' element={<AllUsers/>}></Route>



            <Route path='/earbudproduct' element={<EarbudProducts/>} ></Route>
            <Route path='/products/:id' element={<SingleProduct/>}></Route>


        

        </Routes>
    </div>
   )
}

export default AllRoutes