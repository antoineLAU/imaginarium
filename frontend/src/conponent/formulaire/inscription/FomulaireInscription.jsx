import { useState } from "react";
import Bouton from "../../bouton/Bouton";

function FormulaireInscription({ onAnnuler }) {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function inscrire() {
    if (email !== confirmEmail) {
      console.log("emails differents");
      return;
    }

    if (password !== confirmPassword) {
      console.log("mots de passe differents");
      return;
    }

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pseudo: pseudo, email: email, password: password })
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      <h2>Inscription</h2>
      <input placeholder="pseudo" onChange={(e) => setPseudo(e.target.value)} />
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="confirme email" onChange={(e) => setConfirmEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="confirme password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
      <Bouton texte= "S'inscrire" onClick={inscrire} />
      <Bouton texte= "Annuler" onClick={onAnnuler}/>
    </>
  );
}

export default FormulaireInscription;