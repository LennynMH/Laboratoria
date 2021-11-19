import BtnReturn from '../components/BtnReturn.jsx';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import imgDefault from '../assets/oops.jpg';
import { getStockSku, apiGetProduct } from '../APIS/api';

const LocationProduct = () => {
  const [dataProducts, setDataProducts] = useState([]);
  // console.log(dataProducts)

  let { search } = useLocation();
  let query = new URLSearchParams(search);
  const tokenPar = query.getAll("token")[0];
  const decoded = jwt_decode(tokenPar);

  // console.log(decoded);
  sessionStorage.setItem('nombretienda', decoded.nombretienda);
  sessionStorage.setItem('codigotienda', decoded.codigotienda);
  sessionStorage.setItem('codigopais', decoded.codigopais);

  let url;
  if (decoded.codigojerarquia && decoded.codigopasillo) {
    let pasilloProd = decoded.codigopasillo.replace(/\./g, " ").replace(/ /g, "");
    url = `https://storage.googleapis.com/tot-bi-corp-chatbot-dev.appspot.com/EXPERIENCIA-DIGITAL/${decoded.codigopais}/LABORATORIA/${decoded.codigotienda}/${decoded.codigojerarquia}-${pasilloProd}.jpg`;
  } else {
    url = imgDefault;
  }


  const getProduct = async () => {

    const data = await apiGetProduct(decoded.nombreproducto, '123', '1', '5');
    console.log('data', data);

    console.log(decoded.nombreproducto);


    const orderData = data.sort(function (a, b) {
      if (a.marca === "tottus") {
        return 1;
      } if (b.marca !== "tottus") {
        return -1
      }
      return 0;
    });
    setDataProducts(orderData);
    // console.log(orderData)
  };

  useEffect(() => {
    getProduct();

  }, []);
  // console.log(decoded);

  return (
    <section className='d-flex flex-column'>
      <BtnReturn />
      <div className="containerTextProduct">
        <p>{decoded.nombreproducto}</p>
        {
          decoded.codigopasillo && <p>Pasillo: {decoded.codigopasillo}</p>
        }
      </div>
      <div className="containerImage">
        <img src={url} alt='mapa del producto' />
      </div>
      <div className="col titleCarousel">
        <h1>Productos relacionados</h1>
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
              </div>)}
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

export default LocationProduct;