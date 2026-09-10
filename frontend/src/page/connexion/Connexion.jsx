import { useNavigate } from "react-router-dom";
import FormulaireConnexion from "../../conponent/formulaire/connexion/FormulaireConnexion";
import Header from "../../conponent/header/Header";
import "./connexion.css";

function Connexion() {
  const navigate = useNavigate();
  const retourAccueil = () => navigate("/");

  return (
    <div>
      <Header showNav={false} showConnexion={false} showRejoindre={false} onConnexion={() => navigate("/connexion")} />
      <FormulaireConnexion onAnnuler={retourAccueil} />
    </div>
  );
}

export default Connexion;