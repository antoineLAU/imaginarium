import Bouton from "../bouton/Bouton";
import "./Header.css";

function Header({ onRejoindre }){
    return(
        <div>
            <p>Imaginarium</p>
            <nav>
            <a href="#accueil">Accueil</a>
            <a href="#galerie">Top 10</a>
            <a href="#dessin">art et dessin</a>
            <a href="#livre">texte et Livre</a>
            </nav>
            <div>
            <Bouton texte="Connexion" />
            <Bouton texte="Rejoindre" onClick={onRejoindre} />
            </div>
        </div>
    );
}
export default Header