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
          <h1>L'art et l'histoire naissent de la même source.</h1>
          <p>Imaginariume est né pour deux chose: le dessin et l'écriture. Deux façon de donner vie à ce que l'esprit invente.</p>
          <Bouton texte="Créer mon espace" onClick={() => setVoirInscription(true)} />
          <Bouton texte="Explorer les créations"/>
          <hr />
          <div>
            <div class="stat">
              <div class="stat-number">7 310</div>
              <div class="stat-label">dessinateurs &amp; écrivains</div>
            </div>

            <div class="stat">
              <div class="stat-number">22 000+</div>
              <div class="stat-label">dessins &amp; textes publiés</div>
            </div>
          </div>
        </section>
        <section id="communauté">
          <h2>Dessiner ou écrire</h2>
        </section>
        <section id="dessin">
          <h2>Des imaginations qui méritent d'être vues </h2>
        </section>
        <section id="écriture">
          <h2>Création du moment</h2>
        </section>
      </main>
    </>
  );
}

export default Acceuil;