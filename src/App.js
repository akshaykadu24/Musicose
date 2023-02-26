

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllRoutes from './all-routes/AllRoutes';
import './App.css'
import './App.css';

import Navbar from './components/Navbar';
import NavbarLoggedIn from './components/NavbarLoggedIn';
import AdminNavbar from './pages/AdminPages/adminNavbar';





import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logoutAction } from './redux/authReducer/auth.action';




function App() {
  const {isAuth} = useSelector((store=>store.authManager))
    const token = localStorage.getItem('token')
    const dispatch = useDispatch() 
    const [adminBar,setAdminBar]= useState(false)

    // isAuth&&token? setAdminBar(true): setAdminBar(false)
  return (
    <div className="App">
   
    {/* <AdminNavbar/> */}
    {
            isAuth||token? adminBar?<AdminNavbar/>: <NavbarLoggedIn setAdminBar={setAdminBar}/> : <Navbar />
    


        }

    
      

      
      
      
      <AllRoutes/>
      
    </div>
  );
}

export default App;
