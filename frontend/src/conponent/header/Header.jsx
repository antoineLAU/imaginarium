import Bouton from "../bouton/Bouton";
import "./Header.css";

function Header({ onRejoindre }){
    return(
        <div>
            <p>Imaginarium</p>
            <nav>
            <a href="#accueil">ACCEUIL</a>
            <a href="#communauté">EXPACES CRÉATIFS</a>
            <a href="#dessin">CRÉATEUR À DÉCOUVRIR </a>
            <a href="#écriture">GALERIE & RÉCITS</a>
            </nav>
            <div>
            <Bouton texte="Connexion" />
            <Bouton texte="Rejoindre" onClick={onRejoindre} />
            </div>
        </div>
    );
}
export default Header