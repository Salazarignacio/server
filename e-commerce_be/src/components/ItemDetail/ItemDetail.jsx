function ItemDetail({ title, photo, price }) {
  return (
    <div>
      <img src={photo} className="productsImg" alt={"img"} />
      <div className="">
        <h5 className="">{title}</h5>
        <p className="">${price}</p>
      </div>
      <button>Add To Cart</button>
    </div>
  );
}

export default ItemDetail;
