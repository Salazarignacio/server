import ItemList from "../ItemList/ItemList";
import "./start.css";

function Start({ data }) {
  return (
    <div className="productContainer">
      {data.map((element) => {
        return (
          <div key={element._id}>
            <ItemList
              price={element.price}
              title={element.title}
              photo={element.photo}
              id={element._id}
            />
          </div>
        );
      })}
    </div>
  );
}

export default Start;
