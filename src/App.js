
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminSideAddProducts from './pages/AdminPages/AdminSideAddProducts';
import EarbudProducts from './pages/earbuds/Earbuds';
import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      
      <div>
        <Link to={"/login"}>Login </Link> &nbsp;
        <Link to={"/earbuds"}>Earbuds</Link> &nbsp;
        <Link to={"/adminAddProduct"}>AdminAddProduct</Link> &nbsp;


      </div>
    <Routes>
      <Route path={"/login"} element={<Login/>}></Route>
      <Route path={"/earbuds"} element={<EarbudProducts/>}></Route>
      <Route path={"/adminAddProduct"} element={<AdminSideAddProducts/>}></Route>



    </Routes>
    
    </div>
  );
}

export default App;
