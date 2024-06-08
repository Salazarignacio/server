function Start({ title, photo, id, price }) {
  return (
    <div className="max-w-sm bg-white shadow-md rounded-lg m-4">
    <img src={photo} className="w-full h-48 object-cover rounded-t-lg" alt={id} />
    <div className="p-4">
      <h5 className="text-lg font-semibold">{title}</h5>
      <p className="text-gray-700 mt-2">${price}</p>
      <div className="mt-4 flex space-x-2">
        <a
          href={`/products/details/${id}`}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Details
        </a>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 flex items-center justify-center"
          onClick={() => console.log("destroy")}
          type="button"
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
    </div>
  </div>  );
}

export default Start;
