import { useState } from "react";
import Etape1 from "../../etape/etape1/Etape1";
import Etape2 from "../../etape/etape2/Etape2";
import Etape3 from "../../etape/etape3/Etape3";

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

  function choisirProfil(valeur) {
    setProfil(valeur);
  }

  function changerPrenom(valeur) {
    setprenom(valeur);
  }

  function changerNom(valeur) {
    setnom(valeur);
  }

  function changerPseudo(valeur) {
    setPseudo(valeur);
    if (valeur !== "") {
      setErreurPseudo("");
    }
  }

  function changerEmail(valeur) {
    setEmail(valeur);
    if (valeur !== "") {
      setErreurEmail("");
    }
  }

  function changerPassword(valeur) {
    setPassword(valeur);
    if (valeur !== "") {
      setErreurPassword("");
    }
  }

  function changerConfirm(valeur) {
    setConfirmPassword(valeur);
    if (valeur !== "") {
      setErreurConfirm("");
    }
  }

  function changerBio(valeur) {
    setBio(valeur);
  }

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
        <Etape1 profil={profil} erreurProfil={erreurProfil} onChoisirProfil={choisirProfil} onSuivant={suivant} onAnnuler={onAnnuler} />
      )}
      {etape === 2 && (
        <Etape2 prenom={prenom} nom={nom} pseudo={pseudo} email={email} password={password} confirmPassword={confirmPassword} erreurPseudo={erreurPseudo} erreurEmail={erreurEmail} erreurPassword={erreurPassword} erreurConfirm={erreurConfirm} onPrenom={changerPrenom} onNom={changerNom} onPseudo={changerPseudo} onEmail={changerEmail} onPassword={changerPassword} onConfirm={changerConfirm} onRetour={retour} onSuivant={suivant} />
      )}
      {etape === 3 && (
        <Etape3 bio={bio} succes={succes} onBio={changerBio} onRetour={retour} onInscrire={inscrire} onAnnuler={onAnnuler} />
      )}
    </>
  );
}

export default FormulaireInscription;