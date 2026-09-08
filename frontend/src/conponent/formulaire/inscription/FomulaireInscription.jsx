import { useState } from "react";

function FormulaireInscription() {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function inscrire() {
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
      <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={inscrire}>S inscrire</button>
    </>
  );
}

export default FormulaireInscription;