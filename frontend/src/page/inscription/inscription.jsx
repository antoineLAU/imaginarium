import FormulaireInscription from "../../conponent/formulaire/inscription/FomulaireInscription";

function Inscription({ onAnnuler }) {
  return (
    <>
      <FormulaireInscription onAnnuler={onAnnuler} />
    </>
  );
}

export default Inscription;