

import AllRoutes from './all-routes/AllRoutes';
import './App.css';
import { TrendingSlider } from './components/Revati_components/slider';
import EarbudProducts from './pages/earbuds/Earbuds';
import Login from './pages/login/Login';
import SingleProduct from './pages/single-product/SingleProduct';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminSideAddProducts from './pages/AdminPages/AdminSideAddProducts';
import EarbudProducts from './pages/earbuds/Earbuds';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

function App() {
  return (
    <div className="App">

    {/* <Login/> */}
    <AllRoutes/>
    {/* <EarbudProducts/> */}
    {/* <TrendingSlider/> */}

      
      <div>
        <Link to={"/login"}>Login </Link> &nbsp;
        <Link to={"/signup"}>SignUp </Link> &nbsp;

        <Link to={"/earbuds"}>Earbuds</Link> &nbsp;
        <Link to={"/adminAddProduct"}>AdminAddProduct</Link> &nbsp;


      </div>
    <Routes>
      <Route path={"/login"} element={<Login/>}></Route>
      <Route path={"/signup"} element={<Signup/>}></Route>

      <Route path={"/earbuds"} element={<EarbudProducts/>}></Route>
      <Route path={"/adminAddProduct"} element={<AdminSideAddProducts/>}></Route>



    </Routes>
    </div>
  );
}

export default App;
