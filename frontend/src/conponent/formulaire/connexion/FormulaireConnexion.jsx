import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bouton from "../../bouton/Bouton";

function FormulaireConnexion({ onAnnuler }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function connecter() {
    if (email === "" || password === "") {
      console.log("remplis tous les champs");
      return;
    }

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("pseudo", data.pseudo);
          localStorage.setItem("role", data.role);
          localStorage.setItem("token", data.token);
          navigate("/tableau-de-bord");
        } else {
          console.log(data);
        }
      });
  }

  return (
    <div>
      <h1>Connexion</h1>
      <div>
        <label>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Mot de passe</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <Bouton texte="Se connecter" onClick={connecter} />
      <Bouton texte="Annuler" onClick={onAnnuler} />
    </div>
  );
}

export default FormulaireConnexion;