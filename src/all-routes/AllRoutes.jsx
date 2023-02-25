import React from 'react';
import {Routes,Route} from "react-router-dom";
import ProductCart from '../pages/cart/productCart';
import EarbudProducts from '../pages/earbuds/Earbuds';
import SingleProduct from '../pages/single-product/SingleProduct';

const AllRoutes = ()=>{
   return(
    <div>
        <Routes>
        <Route path='/earbudproduct' element={<EarbudProducts/>} ></Route>
        <Route path='/products/:id' element={<SingleProduct/>}></Route>
        <Route path='/productCart' element={<ProductCart/>} ></Route>
        </Routes>
    </div>
   )
}

export default AllRoutes