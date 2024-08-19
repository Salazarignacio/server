import { useState } from "react";

export default function User() {
  const [us, setUs] = "";

  fetch(`http://localhost:8080/api/users/ru`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data.response);

    });
}
