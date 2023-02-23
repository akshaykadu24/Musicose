
import './App.css';
import Navbar from './components/Navbar';
import Mainroute from './pages/Mainroutes';
// import EarbudProducts from './pages/earbuds/Earbuds';
// import Login from './pages/login/Login';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Mainroute />
      {/* <Login/> */}

      {/* <EarbudProducts/> */}
    </div>
  );
}

export default App;
