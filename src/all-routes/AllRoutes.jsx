import React from 'react';
import {Routes,Route} from "react-router-dom";
import { AdminSideAddProducts } from '../pages/AdminPages/AdminSideAddProducts';
import Login from '../pages/auth/Login';
import PrivateRoute from '../pages/auth/privateRoute';
import Signup from '../pages/auth/Signup';
import EarbudProducts from '../pages/earbuds/Earbuds';
import SingleProduct from '../pages/single-product/SingleProduct';

const AllRoutes = ()=>{
   return(
    <div>
        <Routes>
            <Route path={"/login"} element={<Login/>}></Route>
            <Route path={"/signup"} element={<Signup/>}></Route>

            <Route path={"/earbuds"} element={ <EarbudProducts/> }></Route>
            <Route path={"/adminAddProduct"} element={<PrivateRoute> <AdminSideAddProducts/> </PrivateRoute>}></Route>

            <Route path='/earbudproduct' element={<EarbudProducts/>} ></Route>
            <Route path='/products/:id' element={<SingleProduct/>}></Route>

        
        </Routes>
    </div>
   )
}

export default AllRoutes