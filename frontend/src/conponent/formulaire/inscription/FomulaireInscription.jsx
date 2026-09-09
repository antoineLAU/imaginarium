import { useState } from "react";
import Bouton from "../../bouton/Bouton";

function FormulaireInscription({ onAnnuler }) {
  const [prenom, setprenom] = useState("");
  const [nom, setnom] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [etape, setEtape] = useState(1);
  const [profil, setProfil] = useState("");
  const [bio, setBio] = useState("");

  function suivant() {
    if (etape === 1 && profil === "") {
      console.log("choisis un profil");
      return;
    }

    if (etape === 2) {
      if (prenom === "" || nom === "" || pseudo === "" || email === "" || password === "" || confirmPassword === "") {
        console.log("remplis tous les champs");
        return;
      }

      if (password !== confirmPassword) {
        console.log("mots de passe differents");
        return;
      }
    }

    setEtape(etape + 1);
  }

  function retour() {
    setEtape(etape - 1);
  }

  function inscrire() {
    if (password !== confirmPassword) {
      console.log("mots de passe differents");
      return;
    }

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({prenom: prenom, nom:nom, pseudo: pseudo, email: email, password: password })
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  return (
    <>
      {etape === 1 && (
        <div>
          <h3>Etape 1 sur 3</h3>
          <h3>Ton univers créatif</h3>
          <h1>Tu es plutôt</h1>
          <label>
            <input type="radio" name="profil" onChange={() => setProfil("dessinateur")} />
            Dessinateur.ice
          </label>
          <label>
            <input type="radio" name="profil" onChange={() => setProfil("ecrivain")} />
            Ecrivain.e
          </label>
          <label>
            <input type="radio" name="profil" onChange={() => setProfil("polyvalent")} />
            Polyvalent.e
          </label>
          <Bouton texte="Suivant" onClick={suivant} />
          <Bouton texte="Annuler" onClick={onAnnuler} />
        </div>
      )}
      {etape === 2 && (
        <div>
          <h3>Etape 2 sur 3</h3>
          <h3>Ton Identité</h3>
          <h1>Qui est tu?</h1>
          <div>
            <div>
              <label>Prénom</label>
              <input onChange={(e) => setprenom(e.target.value)}/>
            </div>
            <div>
              <label>nom</label>
            <input onChange={(e) => setnom(e.target.value)}/>
            </div>
          </div>
          <label>Pseudo</label>
          <input onChange={(e) => setPseudo(e.target.value)} />
          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} />
          <label>Mot de passe</label>
          <input onChange={(e) => setPassword(e.target.value)} />
          <label>Confirmation du mot de passe</label>
          <input onChange={(e) => setConfirmPassword(e.target.value)} />
          <Bouton texte="Retour" onClick={retour} />
          <Bouton texte="Suivant" onClick={suivant} />
        </div>
      )}
      {etape === 3 && (
        <div>
          <h3>Etape 3 sur 3</h3>
          <h3>Ton univers en quelque mots</h3>
          <h1>Parle-nous de toi</h1>
          <div>
            <label>Ta bio créative</label>
            <textarea maxLength={280} onChange={(e) => setBio(e.target.value)} />
            <p>{bio.length}/280</p>
          </div>
          <Bouton texte="Retour" onClick={retour} />
          <Bouton texte="S'inscrire" onClick={inscrire} />
          <Bouton texte="Annuler" onClick={onAnnuler} />
        </div>
      )}
    </>
  );
}

export default FormulaireInscription;