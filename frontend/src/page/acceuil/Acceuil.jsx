import { useState, useEffect } from "react";
import Bouton from "../../conponent/bouton/Bouton";
import "./Acceuil.css";

function Acceuil() {
  const [message, setMessage] = useState("connexion en cours");

  useEffect(() => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <>
      <h1>Imaginarium</h1>
      <p>{message}</p>
      <Bouton texte="Connexion" />
      <Bouton texte="Inscription" />
    </>
  );
}

export default Acceuil;