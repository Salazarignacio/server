import { Link } from "react-router-dom";

function ItemList({ title, photo, id, price }) {
  return (
    <div key={id}>
      <img src={photo} className="productsImg" alt={id} />
      <div className="">
        <h5 className="">{title}</h5>
        <p className="">${price}</p>
        <button>
          <Link to={`/products/details/${id}`} className="">
            Details
          </Link>
        </button>
      </div>
    </div>
  );
}

export default ItemList;
