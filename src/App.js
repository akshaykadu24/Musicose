
import AllRoutes from './all-routes/AllRoutes';
import './App.css';
import { TrendingSlider } from './components/Revati_components/slider';
import EarbudProducts from './pages/earbuds/Earbuds';
import Login from './pages/login/Login';
import SingleProduct from './pages/single-product/SingleProduct';

function App() {
  return (
    <div className="App">
    {/* <Login/> */}
    <AllRoutes/>
    {/* <EarbudProducts/> */}
    {/* <TrendingSlider/> */}
    </div>
  );
}

export default App;
