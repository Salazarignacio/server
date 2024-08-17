function ItemDetail({ title, photo, price, addToCart }) {
  return (
    <div>
      <img src={photo} className="productsImg" alt={"img"} />
      <div className="">
        <h5 className="">{title}</h5>
        <p className="">${price}</p>
      </div>
      <button onClick={() => addToCart()}>Add To Cart</button>
    </div>
  );
}

export default ItemDetail;
