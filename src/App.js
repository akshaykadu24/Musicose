

import AllRoutes from './all-routes/AllRoutes';
import './App.css'
import { Link } from 'react-router-dom';
import './App.css';


import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logoutAction } from './redux/authReducer/auth.action';
import Speaker from './pages/earbuds/Speaker';

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
      
      <Speaker/>
      <AllRoutes/>
      
    </div>
  );
}

export default App;
