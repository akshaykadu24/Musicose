
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminSideAddProducts from './pages/AdminPages/AdminSideAddProducts';
import EarbudProducts from './pages/earbuds/Earbuds';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logoutAction } from './redux/authReducer/auth.action';
import PrivateRoute from './pages/auth/privateRoute';

function App() {

  const dispatch = useDispatch()
  return (
    <div className="App">
      
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
    
    </div>
  );
}

export default App;
