/*  */
/*  */

async function thanks() {
  let online = await fetch("/api/sessions/online");
  online = await online.json();
  const { user_id } = online;

  let res = await fetch(`/api/carts/paginate?user_id=${user_id}`);
  res = await res.json();
  res.response.map((element) => {
    destroy(element._id);
  });
}

thanks();

async function destroy(oid) {
  try {
    const url = "/api/carts/" + oid;
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    let response = await fetch(url, opts);
    response = await response.json();
    location.reload();
  } catch (error) {
    throw error;
  }
}
