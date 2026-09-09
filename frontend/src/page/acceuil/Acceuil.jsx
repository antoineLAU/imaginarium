import { useState } from "react";
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
      <header>
        <p>Imaginarium</p>
        <nav>
          <a href="#accueil">Accueil</a>
          <a href="#galerie">Top 10</a>
          <a href="#dessin">art et dessin</a>
          <a href="#livre">texte et Livre</a>
        </nav>
        <div>
        <Bouton texte="Connexion" />
        <Bouton texte="Inscription" onClick={() => setVoirInscription(true)} />
        </div>
      </header>
      <main>
        <section id="accueil">
          <h1>Imaginarium</h1>
          <p> text</p>
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