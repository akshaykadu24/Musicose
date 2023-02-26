

import AllRoutes from './all-routes/AllRoutes';
import './App.css'
import './App.css';



import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { logoutAction } from './redux/authReducer/auth.action';
import Speaker from './pages/earbuds/Speaker';


function App() {

  return (
    <div className="App">

    
      
      
      
      
      <AllRoutes/>
      
    </div>
  );
}

export default App;
