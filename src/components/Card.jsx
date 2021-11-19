import { useNavigate } from "react-router-dom";
import jwt from "jsonwebtoken";

export const Card = ({newData}) => {
  // console.log(newData);
  let navigate = useNavigate();

  const handlerLocation = (data) =>{
    const token = jwt.sign(
      data,
      "BLABLA"
    );
    navigate(`/locationproduct?token=${token}`);
  };

  const handlerStock = (data) => {
    const token = jwt.sign(
      data,
      "BLABLA"
    );
    navigate(`/stockproduct?token=${token}`);
  }

  return (
    <>
      {newData.map((elem, index) => (
        <div key={index} className="myCard">
          <img src={elem.images} className="card-img-top" alt={elem.name} />
          <div className="">
            <h5 className="card-title">{elem.name}</h5>
            <p className="card-text">s/ {elem.prices}</p>
          </div>
          <div className="cardButtons">
            <button type="button" className="card-Btn-Stock" onClick={() => handlerLocation(elem)}>
              Ubicación
            </button>
            <button type="button" className="card-Btn-Stock" onClick={()=> handlerStock(elem)}>
              Stock
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
