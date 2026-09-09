import { useState } from "react";
import Header from "../../conponent/header/Header";
import Bouton from "../../conponent/bouton/Bouton";
import Inscription from "../inscription/inscription";
import "./Acceuil.css";

function Acceuil() {
  const [voirInscription, setVoirInscription] = useState(false);

  if (voirInscription) {
    return (
      <>
        <Inscription onAnnuler={() => setVoirInscription(false)} />
      </>
    );
  }

  return (
    <>
      <Header onRejoindre={() => setVoirInscription(true)} />
      <main>
        <section id="accueil">
          <h1>Imaginarium</h1>
          <p> text</p>
          <Bouton texte="Créer mon espace" onClick={() => setVoirInscription(true)} />
          <Bouton texte="Explorer les créations"/>
        </section>
        <section id="galerie">
          <h2>top 10 des plus vus</h2>
        </section>
        <section id="dessin">
          <h2>Art et dessin</h2>
        </section>
        <section id="livre">
          <h2>texte et livre</h2>
        </section>
      </main>
    </>
  );
}

export default Acceuil;