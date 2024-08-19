import { useEffect, useContext, useState } from "react";
import Login from "../login/Login";
import { ThemeContext } from "../context/Context";

function LoginContainer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const theme = useContext(ThemeContext);
  const { user, setUser } = theme;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      password: password,
      email: email,
      headers: { "Content-Type": "application/json" },
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    };
    let response = await fetch(
      "http://localhost:8080/api/sessions/login",
      opts
    );
    response = await response.json();

    if (response.statusCode == 200) {
      const optOnline = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      };

      let onlineFetch = await fetch(
        "http://localhost:8080/api/sessions/on",
        optOnline
      );
      onlineFetch = await onlineFetch.json();

      setUser(onlineFetch);
      console.log(onlineFetch);
      console.log(user);
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
