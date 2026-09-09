import FormulaireInscription from "../../conponent/formulaire/inscription/FomulaireInscription";
import "./inscription.css";
function Inscription({ onAnnuler }) {
  return (
    <div>
      <FormulaireInscription onAnnuler={onAnnuler} />
    </div>
  );
}

export default Inscription;