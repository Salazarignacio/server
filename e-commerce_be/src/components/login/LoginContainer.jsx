import { useEffect, useState } from "react";
import Login from "./Login";

function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: password,
      email: email,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    console.log(data);

    let response = await fetch(
      "http://localhost:8080/api/sessions/login",
      opts
    );

    response = await response.json();

    if (response.statusCode == 200) {
      /* location.replace("/"); */
      console.log(response);
    } else {
      console.log(response);
    }
  };
  return (
    <>
      <Login
        password={password}
        setPassword={setPassword}
        email={email}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      ></Login>
    </>
  );
}

export default LoginContainer;
