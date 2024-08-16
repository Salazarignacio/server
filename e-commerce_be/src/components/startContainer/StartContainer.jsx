import Start from "../start/Start";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./startContainer.css";

function StartContainer() {
  const queries = new URL(location.href);
  let split = queries.pathname.split("/");
  split = split[split.length - 1];

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const { product_id} = useParams()

  useEffect(() => {
    fetch(
      `http://localhost:8080/api/products/paginate/?category=${split}&page=${page}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data.response);
      });
  }, [page]);
  return (
    <div>
      <h1>Hola</h1>
      {/* aca va la imagen */}
      <div className="cont">
        {products.map((product) => (
          <div className="productsContainer">
            <Start
              key={product._id}
              title={product.title}
              photo={product.photo}
              price={product.price}
              id={product._id}
            ></Start>
          </div>
        ))}
      </div>
    </div>
  );
}
export default StartContainer;
