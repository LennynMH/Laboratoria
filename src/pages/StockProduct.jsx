import {useState, useEffect} from 'react';
import BtnReturn from '../components/BtnReturn.jsx';
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import StockAvalaible from '../components/StockAvalaible.jsx';
import StockNotAvalaible from '../components/StockNotAvalaible.jsx';
import imgDefault from '../assets/oops.png';

const StockProduct = ({ apiGetProductSku,  apiGetProduct}) => {

  const [uniqueProduct, setUniqueProduct] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);

  let { search } = useLocation();
  let query = new URLSearchParams(search);
  const tokenPar = query.getAll("token")[0];
  const decoded = jwt_decode(tokenPar);
  console.log(decoded);

  sessionStorage.setItem('nombretienda', decoded.nombretienda);
  sessionStorage.setItem('codigotienda', decoded.codigotienda);
  sessionStorage.setItem('codigopais', decoded.codigopais);
  // sessionStorage.setItem('codigopais', decoded.codigopais);

  const queryProduct = async() =>{
    const info = await apiGetProductSku(decoded.codigosku, decoded.codigotienda);
    setUniqueProduct(info);
  };

    
  let url;
  if(decoded.codigojerarquia && decoded.codigopasillo){
    let pasilloProd = decoded.codigopasillo.replace(/\./g, " ").replace(/ /g, "");
    url = `https://storage.googleapis.com/tot-bi-corp-chatbot-dev.appspot.com/EXPERIENCIA-DIGITAL/${decoded.codigopais}/LABORATORIA/${decoded.codigotienda}/${decoded.codigojerarquia}-${pasilloProd}.jpg`;
  } else {
    url = imgDefault;
  }
  

  const getProduct = async () => {
    const data = await apiGetProduct(decoded.nombreproducto, '123', '1', '10');
    setDataProducts(data);
  }

  useEffect(() => {
    getProduct();

  }, []);

  useEffect(()=>{
    queryProduct();
  }, []);


  return (
    <section className="">
      <BtnReturn />
      <StockAvalaible uniqueProduct={uniqueProduct}/>
      {/* <StockNotAvalaible /> */}
        {/* { 
          !!uniqueProduct.length ? <StockAvalaible uniqueProduct={uniqueProduct}/> : <StockNotAvalaible />
        } */}
        <div className="col titleCarousel">
          <h1>Productos similares</h1>
          <hr />
        </div>
        <section className="carouselMainContainerl">
        <div id="carouselExampleControlsNoTouching" className="carousel slide contentCarrusel" data-bs-touch="false" data-bs-interval="false" >
          <div className="carousel-inner" >
            {
              dataProducts ? (dataProducts.map((item, index) => 
                index === 0 ? (
                <div className="carousel-item active" key={index}>
                  <section className="containerImageText">
                    <img src={item.images} className="" alt={item.name} />
                    <div className="textCarousel">
                      <h5>{item.name}</h5>
                      <p>s/{item.prices} UN</p>
                    </div>
                  </section>
                </div>
                ) : (
                <div className="carousel-item " key={index}>
                  <section className="containerImageText">
                    <img src={item.images} className="" alt={item.name} />
                    <div className="textCarousel">
                      <h5>{item.name}</h5>
                      <p>s/{item.prices} UN</p>
                    </div>
                  </section>
                </div>
                )
              )) : (<div class="spinner-border text-success" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>) }
          </div>

          <button className="carousel-control-prev " type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
        </section>
    </section>
  )
}

export default StockProduct;
