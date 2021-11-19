import alerta from '../assets/alert.png';

const Error404 = () => {
  return (
    <section className="containerError text-center p-3">
      <div>
        <h1 className="titleError">Producto no encontrado</h1>
      </div>
      <div className="divContainer">
        <figure className="containerFigure" heigh="100%">
          <img className="imgAlert justify-content-center" width="100%" height="100%" src={alerta} alt="" />
        </figure>
      </div>
      <div className="descriptionError">
        <p>Lo sentimos, este producto no se encuentra disponible.</p>
      </div>
      <button className="btnHome p-2">
        <span><a href="/experienciatienda">Volver al home</a> </span>
      </button>
    </section>
  )
}

export default Error404;
