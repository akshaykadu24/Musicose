

// import AllRoutes from './all-routes/AllRoutes';
import './App.css';

import Navbar from './components/Navbar';
import Mainroute from './pages/Mainroutes';
// import EarbudProducts from './pages/earbuds/Earbuds';
// import Login from './pages/login/Login';

// import { TrendingSlider } from './components/Revati_components/slider';
// import EarbudProducts from './pages/earbuds/Earbuds';
// import Login from './pages/login/Login';
// import SingleProduct from './pages/single-product/SingleProduct';
// import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
// import AdminSideAddProducts from './pages/AdminPages/AdminSideAddProducts';



function App() {

  // const dispatch = useDispatch();
  return (
    <div className="App">
      <Navbar />
      <Mainroute />;
      {/* <Login/> */}

      {/* <EarbudProducts/> */}




      <div>
        {/* <Link to={"/login"}>Login </Link> &nbsp;
        <Link to={"/signup"}>SignUp </Link> &nbsp; */}



      </div>

    </div >
  );
}

export default App;
