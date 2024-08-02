import Start from "../start/Start";
import { useEffect, useState } from "react";

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
    <>
      {products.map((product) => (
        <Start
          key={product.id}
          title={product.title}
          photo={product.photo}
          price={product.price}
          id={product.id}
        ></Start>
      ))}
    </>
  );
}
export default StartContainer;
