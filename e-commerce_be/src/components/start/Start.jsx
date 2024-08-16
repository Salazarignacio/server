import  './start.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Start({ title, photo, id, price }) {
  const {product_id} = useParams()
  return (
    <div className="productContainer">
      <img src={photo} className="productsImg" alt={id} />
      
        <div className="">
        <h5 className="">{title}</h5>
        <p className="">${price}</p>
          <Link to={`/products/details/${id}`} className="">
            Details
          </Link>
          <button
            className=""
            onClick={() => console.log("destroy")}
            type="button"
          >
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      
    </div>
  );
}

export default Start;
