import Bouton from "../bouton/Bouton";
import "./Header.css";

function Header({ onRejoindre, showNav = true, showConnexion = true, texteBouton = "Rejoindre" }) {
    return (
        <div className="header">
            <p className="header-logo">Imaginarium</p>

            {showNav && (
                <nav className="header-nav">
                    <a href="#accueil">ACCUEIL</a>
                    <a href="#communauté">ESPACES CRÉATIFS</a>
                    <a href="#dessin">CRÉATEUR À DÉCOUVRIR</a>
                    <a href="#écriture">GALERIE & RÉCITS</a>
                </nav>
            )}

            <div className="header-buttons">
                {showConnexion && <Bouton texte="Connexion" />}
                <Bouton texte={texteBouton} onClick={onRejoindre} />
            </div>
        </div>
    );
}

export default Header;