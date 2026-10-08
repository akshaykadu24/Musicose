

import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AllRoutes from './all-routes/AllRoutes';
import './App.css'
import Footer from './components/Footer';

import Navbar from './components/Navbar';
import NavbarLoggedIn from './components/NavbarLoggedIn';
import AdminNavbar from './pages/AdminPages/adminNavbar';
import AuthStatusPopup from './components/auth/AuthStatusPopup';
import { hideAuthPopup } from './redux/authReducer/auth.action';









// Pages that belong to the admin panel. The navbar is picked from the URL so it
// survives a page refresh (redux state is lost on reload).
const ADMIN_PATHS = ["/adminSideProducts", "/adminAddProduct", "/alluser", "/users", "/user"]

function App() {
  const {isAuth, popup} = useSelector((store=>store.authManager))
  const dispatch = useDispatch()
  const closeAuthPopup = useCallback(()=>dispatch(hideAuthPopup()),[dispatch])
  const { pathname } = useLocation()
  const token = localStorage.getItem('token')
  const isAdminPage = ADMIN_PATHS.includes(pathname)

  return (
    <div className="App">
      {isAuth || token ? (isAdminPage ? <AdminNavbar /> : <NavbarLoggedIn />) : <Navbar />}

      <AllRoutes/>
      <Footer />
      <AuthStatusPopup popup={popup} onClose={closeAuthPopup} />
    </div>
  );
}

export default App;
