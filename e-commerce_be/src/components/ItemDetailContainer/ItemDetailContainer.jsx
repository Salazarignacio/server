import { useEffect, useState } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";

import { useContext } from "react";
import { ThemeContext } from "../context/Context";

export default function ItemDetailContainer() {
  const [product, setProduct] = useState({});
  const { product_id } = useParams();
  const theme = useContext(ThemeContext);
  const {user} = theme
console.log(user);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${product_id}`
        );
        const data = await response.json();
        setProduct(data.response);
      } catch (error) {
        throw error;
      }
    };

    fetchProduct();
  }, []);

  return (
    <>
      <ItemDetail
        photo={product.photo}
        price={product.price}
        title={product.title}
      />
    </>
  );
}
