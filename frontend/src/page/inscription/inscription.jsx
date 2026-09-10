import { useNavigate } from "react-router-dom";
import FormulaireInscription from "../../conponent/formulaire/inscription/FomulaireInscription";
import Header from "../../conponent/header/Header";
import "./inscription.css";

function Inscription() {
  const navigate = useNavigate();
  const retourAccueil = () => navigate("/");

  return (
    <div>
      <Header showNav={false} showConnexion={false} texteBouton="Retour" onRejoindre={retourAccueil} />
      <FormulaireInscription onAnnuler={retourAccueil} />
    </div>
  );
}

export default Inscription;