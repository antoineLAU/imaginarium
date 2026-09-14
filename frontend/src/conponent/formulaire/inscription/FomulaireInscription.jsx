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
  const [erreurProfil, setErreurProfil] = useState("");
  const [erreurPseudo, setErreurPseudo] = useState("");
  const [erreurEmail, setErreurEmail] = useState("");
  const [erreurPassword, setErreurPassword] = useState("");
  const [erreurConfirm, setErreurConfirm] = useState("");
  const [succes, setSucces] = useState("");

  function suivant() {
    if (etape === 1) {
      if (profil === "") {
        setErreurProfil("choisis un profil");
        return;
      } else {
        setErreurProfil("");
      }
    }

    if (etape === 2) {
      let erreur = false;
      if (pseudo === "") {
        setErreurPseudo("pseudo obligatoire");
        erreur = true;
      } else {
        setErreurPseudo("");
      }
      if (email === "") {
        setErreurEmail("email obligatoire");
        erreur = true;
      } else {
        setErreurEmail("");
      }
      if (password === "") {
        setErreurPassword("mot de passe obligatoire");
        erreur = true;
      } else {
        setErreurPassword("");
      }
      if (confirmPassword === "") {
        setErreurConfirm("confirmation obligatoire");
        erreur = true;
      } else {
        setErreurConfirm("");
      }
      if (pseudo !== "" && pseudo.length < 3) {
        setErreurPseudo("pseudo 3 lettres minimum");
        erreur = true;
      }
      if (email !== "" && (!email.includes("@") || !email.includes("."))) {
        setErreurEmail("email invalide");
        erreur = true;
      }
      if (password !== "" && password.length < 10) {
        setErreurPassword("password 10 minimum");
        erreur = true;
      }
      if (password !== "" && !/[A-Z]/.test(password)) {
        setErreurPassword("password majuscule obligatoire");
        erreur = true;
      }
      if (password !== "" && !/[a-z]/.test(password)) {
        setErreurPassword("password minuscule obligatoire");
        erreur = true;
      }
      if (password !== "" && !/[^A-Za-z0-9]/.test(password)) {
        setErreurPassword("password caractere special obligatoire");
        erreur = true;
      }
      if (password !== "" && confirmPassword !== "" && password !== confirmPassword) {
        setErreurConfirm("mots de passe differents");
        erreur = true;
      }
      if (erreur === true) {
        return;
      }
    }

    setErreurProfil("");
    setErreurPseudo("");
    setErreurEmail("");
    setErreurPassword("");
    setErreurConfirm("");
    setSucces("");
    setEtape(etape + 1);
  }

  function retour() {
    setErreurProfil("");
    setErreurPseudo("");
    setErreurEmail("");
    setErreurPassword("");
    setErreurConfirm("");
    setSucces("");
    setEtape(etape - 1);
  }

  function inscrire() {
    if (profil === "") {
      setErreurProfil("choisis un profil");
      setEtape(1);
      return;
    }
    if (pseudo === "") {
      setErreurPseudo("pseudo obligatoire");
      setEtape(2);
      return;
    }
    if (email === "") {
      setErreurEmail("email obligatoire");
      setEtape(2);
      return;
    }
    if (password === "") {
      setErreurPassword("mot de passe obligatoire");
      setEtape(2);
      return;
    }
    if (confirmPassword === "") {
      setErreurConfirm("confirmation obligatoire");
      setEtape(2);
      return;
    }
    if (pseudo.length < 3) {
      setErreurPseudo("pseudo 3 lettres minimum");
      setEtape(2);
      return;
    }
    if (!email.includes("@") || !email.includes(".")) {
      setErreurEmail("email invalide");
      setEtape(2);
      return;
    }
    if (password.length < 10) {
      setErreurPassword("password 10 minimum");
      setEtape(2);
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setErreurPassword("password majuscule obligatoire");
      setEtape(2);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setErreurPassword("password minuscule obligatoire");
      setEtape(2);
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setErreurPassword("password caractere special obligatoire");
      setEtape(2);
      return;
    }
    if (password !== confirmPassword) {
      setErreurConfirm("mots de passe differents");
      setEtape(2);
      return;
    }

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({prenom: prenom, nom: nom, pseudo: pseudo, email: email, password: password, profil: profil, bio: bio })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === "pseudo email password obligatoires") {
          setErreurPseudo("pseudo email password obligatoires");
          setEtape(2);
          return;
        }
        if (data.error === "pseudo 3 lettres minimum") {
          setErreurPseudo("pseudo 3 lettres minimum");
          setEtape(2);
          return;
        }
        if (data.error === "email invalide") {
          setErreurEmail("email invalide");
          setEtape(2);
          return;
        }
        if (data.error === "password 10 minimum") {
          setErreurPassword("password 10 minimum");
          setEtape(2);
          return;
        }
        if (data.error === "password majuscule obligatoire") {
          setErreurPassword("password majuscule obligatoire");
          setEtape(2);
          return;
        }
        if (data.error === "password minuscule obligatoire") {
          setErreurPassword("password minuscule obligatoire");
          setEtape(2);
          return;
        }
        if (data.error === "password caractere special obligatoire") {
          setErreurPassword("password caractere special obligatoire");
          setEtape(2);
          return;
        }
        if (data.error === "pseudo deja utilise") {
          setErreurPseudo("pseudo deja utilise");
          setEtape(2);
          return;
        }
        if (data.error === "email deja utilise") {
          setErreurEmail("email deja utilise");
          setEtape(2);
          return;
        }
        setSucces("compte cree avec succes");
        console.log(data);
      });
  }

  return (
    <>
      {etape === 1 && (
        <div>
          <h3>Etape 1 sur 3</h3>
          <h3>Ton univers créatif</h3>
          <h1>Tu es plutôt</h1>
          <label>
            <input type="radio" name="profil" checked={profil === "dessinateur"} onChange={() => setProfil("dessinateur")} />
            Dessinateur.ice
          </label>
          <label>
            <input type="radio" name="profil" checked={profil === "ecrivain"} onChange={() => setProfil("ecrivain")} />
            Ecrivain.e
          </label>
          <label>
            <input type="radio" name="profil" checked={profil === "polyvalent"} onChange={() => setProfil("polyvalent")} />
            Polyvalent.e
          </label>
          {erreurProfil !== "" && <p>{erreurProfil}</p>}
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
              <input onChange={(e) => { setprenom(e.target.value); }} />
            </div>
            <div>
              <label>nom</label>
            <input onChange={(e) => { setnom(e.target.value); }} />
            </div>
          </div>
          <label>Pseudo</label>
          <input onChange={(e) => { setPseudo(e.target.value); if (e.target.value !== "") { setErreurPseudo(""); } }} />
          {erreurPseudo !== "" && <p>{erreurPseudo}</p>}
          <label>Email</label>
          <input onChange={(e) => { setEmail(e.target.value); if (e.target.value !== "") { setErreurEmail(""); } }} />
          {erreurEmail !== "" && <p>{erreurEmail}</p>}
          <label>Mot de passe</label>
          <input type="password" onChange={(e) => { setPassword(e.target.value); if (e.target.value !== "") { setErreurPassword(""); } }} />
          {erreurPassword !== "" && <p>{erreurPassword}</p>}
          <label>Confirmation du mot de passe</label>
          <input type="password" onChange={(e) => { setConfirmPassword(e.target.value); if (e.target.value !== "") { setErreurConfirm(""); } }} />
          {erreurConfirm !== "" && <p>{erreurConfirm}</p>}
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
          {succes !== "" && <p>{succes}</p>}
        </div>
      )}
    </>
  );
}

export default FormulaireInscription;