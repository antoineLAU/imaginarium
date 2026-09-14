import Bouton from "../../bouton/Bouton";

function Etape3({ bio, succes, onBio, onRetour, onInscrire, onAnnuler }) {
  return (
    <div>
      <h3>Etape 3 sur 3</h3>
      <h3>Ton univers en quelque mots</h3>
      <h1>Parle-nous de toi</h1>
      <div>
        <label>Ta bio créative</label>
        <textarea maxLength={280} value={bio} onChange={(e) => onBio(e.target.value)} />
        <p>{bio.length}/280</p>
      </div>
      <Bouton texte="Retour" onClick={onRetour} />
      <Bouton texte="S'inscrire" onClick={onInscrire} />
      <Bouton texte="Annuler" onClick={onAnnuler} />
      {succes !== "" && <p>{succes}</p>}
    </div>
  );
}

export default Etape3;