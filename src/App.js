import './sass/app.scss';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Products from './pages/Products.jsx';
import LocationProduct from './pages/LocationProduct.jsx';
import StockProduct from './pages/StockProduct.jsx';
import Error404 from './pages/Error404';
import { apiGetProduct, apiGetProductSku } from './APIS/api';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/locationproduct" element={<LocationProduct
            apiGetProduct={apiGetProduct}
            apiGetProductSku={apiGetProductSku}
          />} />
          <Route path="/stockproduct" element={<StockProduct
            apiGetProduct={apiGetProduct}
            apiGetProductSku={apiGetProductSku}
          />} />
          <Route path="/experienciatienda" element={<Products
            apiGetProduct={apiGetProduct}
            apiGetProductSku={apiGetProductSku}
          />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
