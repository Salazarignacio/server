import Start from "../start/Start";
import { useEffect, useState } from "react";
import "./startContainer.css";

function StartContainer() {
  const queries = new URL(location.href);
  let split = queries.pathname.split("/");
  split = split[split.length - 1];

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  

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
      
      {/* aca va la imagen */}
      <div className="cont">
        <div className="productsContainer">
          <Start data={products}></Start>
        </div>
      </div>
    </div>
  );
}
export default StartContainer;
