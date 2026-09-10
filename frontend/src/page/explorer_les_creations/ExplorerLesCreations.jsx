import "./ExplorerLesCreations.css";
import { useNavigate } from "react-router-dom";
import Header from "../../conponent/header/Header";
import { useState } from "react";

function ExplorerLesCreations() {
    const navigate = useNavigate();
    const [filtreActif, setFiltreActif] = useState("Tous");
    const [triActif, setTriActif] = useState("Populaire");

    return (
        <>
            <div>
                <Header showNav={false} showConnexion={false} texteBouton="Rejoindre" onRejoindre={() => navigate("inscription")} showAccueil={true} onRetour={() => navigate("/")} />
            </div>
            <p>GALERIE</p>
            <h1>Explorer les créations</h1>
            <p>créations publiées</p>

            <div className="barre-recherche">
                <div className="search-input">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="recherche d'une création" />
                </div>

                <div className="filtres">
                    <button
                        className={`filtre ${filtreActif === "Tous" ? "actif" : ""}`}
                        onClick={() => setFiltreActif("Tous")}
                    >
                        Tous
                    </button>
                    <button
                        className={`filtre ${filtreActif === "Dessin" ? "actif" : ""}`}
                        onClick={() => setFiltreActif("Dessin")}
                    >
                        Dessin
                    </button>
                    <button
                        className={`filtre ${filtreActif === "Écriture" ? "actif" : ""}`}
                        onClick={() => setFiltreActif("Écriture")}
                    >
                        Écriture
                    </button>
                </div>

                <div className="tri">
                    <button
                        className={`tri-btn ${triActif === "Populaire" ? "actif" : ""}`}
                        onClick={() => setTriActif("Populaire")}
                    >
                        ↑ Populaire
                    </button>
                    <button
                        className={`tri-btn ${triActif === "Récent" ? "actif" : ""}`}
                        onClick={() => setTriActif("Récent")}
                    >
                        🕐 Récent
                    </button>
                </div>
            </div>
        </>
    );
}

export default ExplorerLesCreations;