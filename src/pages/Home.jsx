import logo from '../assets/tottusLogo.png';
import supermarket from '../assets/supermarket.png';

const Home = () => {
  return (
    <section class="container">
      <div class="row">
        <div class="d-grid gap-1 col-3 mx-auto">
          <img src={logo} alt="logo tottus"/>
        </div>
      </div>
      <div class="row">
        <div class="d-grid gap-1 col-6 mx-auto">
          <img src={supermarket} alt="imagen super market"/>
        </div>
      </div>
      <div className="row">
        <div className="d-grid gap-1 col-10 mx-auto">
          <p>Sin mucho esfuerzo conoce la ubicacion o stock de un producto dentro de tu tienda Tottus más cercana.</p>
        </div>
      </div>
      <div className="row">
        <div className="d-grid gap-2 col-5 mx-auto">
          <button className="btn btn-success" type="button">Button</button>
        </div>
      </div>
    </section>
  )
}

export default Home;
