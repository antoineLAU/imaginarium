import Bouton from "../../bouton/Bouton";

function Etape1({ profil, erreurProfil, onChoisirProfil, onSuivant, onAnnuler }) {
  return (
    <div>
      <h3>Etape 1 sur 3</h3>
      <h3>Ton univers créatif</h3>
      <h1>Tu es plutôt</h1>
      <label>
        <input type="radio" name="profil" checked={profil === "dessinateur"} onChange={() => onChoisirProfil("dessinateur")} />
        Dessinateur.ice
      </label>
      <label>
        <input type="radio" name="profil" checked={profil === "ecrivain"} onChange={() => onChoisirProfil("ecrivain")} />
        Ecrivain.e
      </label>
      <label>
        <input type="radio" name="profil" checked={profil === "polyvalent"} onChange={() => onChoisirProfil("polyvalent")} />
        Polyvalent.e
      </label>
      {erreurProfil !== "" && <p>{erreurProfil}</p>}
      <Bouton texte="Suivant" onClick={onSuivant} />
      <Bouton texte="Annuler" onClick={onAnnuler} />
    </div>
  );
}

export default Etape1;