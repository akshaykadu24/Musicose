

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllRoutes from './all-routes/AllRoutes';
import './App.css'
import './App.css';
import Footer from './components/Footer';

import Navbar from './components/Navbar';
import NavbarLoggedIn from './components/NavbarLoggedIn';
import AdminNavbar from './pages/AdminPages/adminNavbar';









function App() {
  const {isAuth} = useSelector((store=>store.authManager))
    const token = localStorage.getItem('token')
    const [adminBar,setAdminBar]= useState(false)
  console.log(isAuth,adminBar,token,"kkkk")
    // isAuth&&token? setAdminBar(true): setAdminBar(false)
  console.log(isAuth)
  return (
    <div className="App">
   
        {
            isAuth||token? adminBar?<AdminNavbar  setAdminBar={setAdminBar}/>: <NavbarLoggedIn setAdminBar={setAdminBar}/> : <Navbar />
    
        }

 
      
      <AllRoutes/>
      <Footer />
    </div>
  );
}

export default App;
