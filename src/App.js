

import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllRoutes from './all-routes/AllRoutes';
import './App.css'
import Footer from './components/Footer';

import Navbar from './components/Navbar';
import NavbarLoggedIn from './components/NavbarLoggedIn';
import AdminNavbar from './pages/AdminPages/adminNavbar';
import AuthStatusPopup from './components/auth/AuthStatusPopup';
import { hideAuthPopup } from './redux/authReducer/auth.action';









function App() {
  const {isAuth, popup} = useSelector((store=>store.authManager))
  const dispatch = useDispatch()
  const closeAuthPopup = useCallback(()=>dispatch(hideAuthPopup()),[dispatch])
    const token = localStorage.getItem('token')
    const [adminBar,setAdminBar]= useState(false)
  console.log(isAuth,adminBar,token,"kkkk")
    // isAuth&&token? setAdminBar(true): setAdminBar(false)
    useEffect(()=>{
      
      isAuth && token ? setAdminBar(true):setAdminBar(false)
    },[])

  return (
    <div className="App">
   
        {
            isAuth||token? adminBar?<AdminNavbar  setAdminBar={setAdminBar}/>: <NavbarLoggedIn setAdminBar={setAdminBar}/> : <Navbar />
    
        }

 
      
      <AllRoutes/>
      <Footer />
      <AuthStatusPopup popup={popup} onClose={closeAuthPopup} />
    </div>
  );
}

export default App;
