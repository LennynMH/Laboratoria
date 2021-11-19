import axios from "axios";
import { datapasilloCategory } from "./category";
import { dataTienda } from "./tiendasInfo";


console.log("estas en la nueva repo");


export const apiGetProduct = async (prod, tienda, pagInicio, pagFinal) => {
  const url = `https://lid-per-dot-tot-bi-corp-chatbot-dev.appspot.com/api-per/product-search?q=${prod}&channel=${tienda}&page=${pagInicio}&perPage=${pagFinal}`;

  //const url = `https://www.tottus.com.pe/api/product-search?q=${prod}&channel=${tienda}&page=${pagInicio}&perPage=${pagFinal}`;
  let dataAxios = await axios({
    method: "GET",
    withCredentials: false,
    headers: {
      'x-country': 'PE',
      'x-commerce': 'Tottus',
      'x-usrtx': 'tss',
    },
    url: url,
  });



  const resData = dataAxios.data.results;

  const resultado = resData.map((key) => {

    //filtrra pasillos 
    const filterpasillo = datapasilloCategory.filter(
      (res) => {
        return (res.codigo_tienda === Number(tienda) &&
          res.jerarquia === key.attributes.hierarchy.slice(0, 9))
      }
    );

    const data = {
      id: key.id,
      images: key.images[0],
      name: key.name,
      prices: key.prices.regularPrice,
      codigosku: key.sku,
      marca: key.attributes.marca,
      ean: key.attributes.ean,
      description: key.description,
      codigojerarquia: (key.attributes.hierarchy.slice(0, 9)),
      codigopasillo: (filterpasillo.map(key => key.pasillo))[0],
      codigopais: "PE",
      nombreproducto: key.name, //tengo duda aqui si debe ser categroia o producto
      codigotienda: tienda,
    };
    return data;
  });
  return resultado;
};

//traer data de un producto especifico

export const apiGetProductSku = async (sku, tienda) => {
  const url = `https://lid-per-dot-tot-bi-corp-chatbot-dev.appspot.com/api-per/skuList?productsList=${sku}`;
  //const url = `https://www.tottus.com.pe/api/content/skuList?productsList%5B0%5D=${sku}`;
  const dataAxios = await axios({
    url: url,
    withCredentials: false,
    method: "GET",
    headers: {
      'x-country': 'PE',
      'x-commerce': 'Tottus',
      'x-usrtx': 'tss',
    }
  });

  const resData = dataAxios.data.results;

  const resultado = resData.map((key) => {

    //filtrra pasillos 
    const filterpasillo = datapasilloCategory.filter(
      (res) => {
        return (res.codigo_tienda === Number(tienda) &&
          res.jerarquia === key.attributes.hierarchy.slice(0, 9))
      }
    );

    const data = {
      id: key.id,
      images: key.images[0],
      name: key.name,
      prices: key.prices.regularPrice,
      codigosku: key.sku,
      description: key.description,
      ean: key.attributes.ean,
      codigojerarquia: (key.attributes.hierarchy.slice(0, 9)),
      codigopasillo: filterpasillo[0].pasillo,
      codigopais: "PE",
      nombreproducto: key.name, //tengo duda aqui si debe ser categroia o producto
      codigotienda: tienda,
    };
    return data;
  });

  return resultado;
};


//traer data de stock de acuerdo a un sku .
export const getStockSku = async (sku) => {

  const url = `https://lid-per-dot-tot-bi-corp-chatbot-dev.appspot.com/api-per/stock?sku=${sku}`;
  let stockAxios = await axios({
    method: "GET",
    withCredentials: false,
    headers: {
      'x-country': 'PE',
      'x-commerce': 'Tottus',
      'x-usrtx': 'tss',

    },
    url: url,
  });


  if (stockAxios.data !== 0) {
    console.log(" hay stock");

    const dataStock = stockAxios.data.sku.map((stock) => {
      let nameStore = dataTienda.filter(str => str.CodigoLocal === stock.store);

      if (nameStore[0] === undefined) {
        nameStore[0] = " ";
      };

      const data = {
        store: stock.store,
        storeName: nameStore[0].DescripcionLocal ? nameStore[0].DescripcionLocal : " ",
        storeImagen: nameStore[0].Imagen ? nameStore[0].Imagen : "https://static.wikia.nocookie.net/logopedia/images/9/92/Tottus_logo_apilado_2006.svg/revision/latest/scale-to-width-down/250?cb=20210325031327&path-prefix=es",
        stockAvailable: stock.stockAvailable,
        stockOnLine: stock.stockOnLine,
      };
      return data;

    });
    console.log("datastockapi", dataStock);

    return dataStock;
  } else {
    console.log("no hay stock");
    return ([]);
  }
}

