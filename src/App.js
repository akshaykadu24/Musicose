

import AllRoutes from './all-routes/AllRoutes';
import './App.css';
<<<<<<< HEAD
import Navbar from './components/Navbar';
import Mainroute from './pages/Mainroutes';
// import EarbudProducts from './pages/earbuds/Earbuds';
// import Login from './pages/login/Login';
=======
import { TrendingSlider } from './components/Revati_components/slider';
import EarbudProducts from './pages/earbuds/Earbuds';
//import Login from './pages/login/Login';
import SingleProduct from './pages/single-product/SingleProduct';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
//import AdminSideAddProducts from './pages/AdminPages/AdminSideAddProducts';


import Signup from './pages/auth/Signup';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logoutAction } from './redux/authReducer/auth.action';
import PrivateRoute from './pages/auth/privateRoute';
>>>>>>> d255e6bd043f824b4ccee3c7656fd3af23167a2e

function App() {

  const dispatch = useDispatch()
  return (
    <div className="App">
<<<<<<< HEAD
      <Navbar />
      <Mainroute />
      {/* <Login/> */}

      {/* <EarbudProducts/> */}
=======

    

      
      <div>
        <Link to={"/login"}>Login </Link> &nbsp;
        <Link to={"/signup"}>SignUp </Link> &nbsp;

        <Link to={"/earbuds"}>Earbuds</Link> &nbsp;
        <Link to={"/adminAddProduct"}>AdminAddProduct</Link> &nbsp;
        <Button onClick={()=>{dispatch(logoutAction)}}>Logout</Button>

      </div>
      
    <Routes>
      <Route path={"/login"} element={<Login/>}></Route>
      <Route path={"/signup"} element={<Signup/>}></Route>

      <Route path={"/earbuds"} element={<PrivateRoute> <EarbudProducts/> </PrivateRoute>}></Route>
      <Route path={"/adminAddProduct"} element={<PrivateRoute> <AdminSideAddProducts/> </PrivateRoute>}></Route>


    </Routes>
>>>>>>> d255e6bd043f824b4ccee3c7656fd3af23167a2e
    </div>
  );
}

export default App;
