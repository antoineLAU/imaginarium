import { useNavigate } from "react-router-dom";
import Header from "../../conponent/header/Header";
import Bouton from "../../conponent/bouton/Bouton";
import "./Accueil.css";

function Accueil() {
  const navigate = useNavigate();

  return (
    <>
      <Header onRejoindre={() => navigate("/inscription")} onConnexion={() => navigate("/connexion")} />
      <main>
        <section id="accueil">
          <h1>L'art et l'histoire naissent de la même source.</h1>
          <p>Imaginarium est né pour des choses créatives : le dessin et l'écriture. Deux façons de donner vie à ce que l'esprit invente.</p>
          <Bouton texte="Créer mon espace" onClick={() => navigate("/inscription")} />
          <Bouton texte="Explorer les créations" onClick={() => navigate("/explorer")} />
          <hr />
          <div>
            <div className="stat">
              <div className="stat-number">7 310</div>
              <div className="stat-label">dessinateurs &amp; écrivains</div>
            </div>

            <div className="stat">
              <div className="stat-number">22 000+</div>
              <div className="stat-label">dessins &amp; textes publiés</div>
            </div>
          </div>
        </section>
        <section id="communauté">
          <h2>Dessiner ou écrire</h2>
        </section>
        <section id="dessin">
          <h2>Des imaginations qui méritent d'être vues</h2>
        </section>
        <section id="écriture">
          <h2>Création du moment</h2>
        </section>
      </main>
    </>
  );
}

export default Accueil;