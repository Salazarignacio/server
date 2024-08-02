import { useEffect, useState } from "react";

function Print() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/sessions/online")
  .then((data)=>data.json()).then((data)=>{console.log(data); setUser(data)})
  console.log(user.statusCode);
}, []);
console.log(user);
}

export default Print;
