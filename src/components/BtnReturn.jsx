import { Link } from "react-router-dom";

const BtnReturn = () => {
  return (
    <section className="containerBack">
      <Link to="/experienciatienda">
        <i className="fas fa-chevron-left"></i>
      </Link>
      <p>¿Quieres consultar otro producto?</p>
    </section>
  )
}


export default BtnReturn;
