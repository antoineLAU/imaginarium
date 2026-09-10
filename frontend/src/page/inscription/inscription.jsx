import FormulaireInscription from "../../conponent/formulaire/inscription/FomulaireInscription";
import Header from "../../conponent/header/Header";
import "./inscription.css";
function Inscription({ onAnnuler }) {
  return (
    <div>
      <Header/>
      <FormulaireInscription onAnnuler={onAnnuler} />
    </div>
  );
}

export default Inscription;