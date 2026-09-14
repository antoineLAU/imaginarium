import Bouton from "../../bouton/Bouton";

function Etape2({ prenom, nom, pseudo, email, password, confirmPassword, erreurPseudo, erreurEmail, erreurPassword, erreurConfirm, onPrenom, onNom, onPseudo, onEmail, onPassword, onConfirm, onRetour, onSuivant }) {
  return (
    <div>
      <h3>Etape 2 sur 3</h3>
      <h3>Ton Identité</h3>
      <h1>Qui est tu?</h1>
      <div>
        <div>
          <label>nom</label>
          <input value={nom} onChange={(e) => onNom(e.target.value)} />
        </div>
        <div>
          <label>Prénom</label>
          <input value={prenom} onChange={(e) => onPrenom(e.target.value)} />
        </div>
      </div>
      <label>Pseudo</label>
      <input value={pseudo} onChange={(e) => onPseudo(e.target.value)} />
      {erreurPseudo !== "" && <p>{erreurPseudo}</p>}
      <label>Email</label>
      <input value={email} onChange={(e) => onEmail(e.target.value)} />
      {erreurEmail !== "" && <p>{erreurEmail}</p>}
      <label>Mot de passe</label>
      <input type="password" value={password} onChange={(e) => onPassword(e.target.value)} />
      {erreurPassword !== "" && <p>{erreurPassword}</p>}
      <label>Confirmation du mot de passe</label>
      <input type="password" value={confirmPassword} onChange={(e) => onConfirm(e.target.value)} />
      {erreurConfirm !== "" && <p>{erreurConfirm}</p>}
      <Bouton texte="Retour" onClick={onRetour} />
      <Bouton texte="Suivant" onClick={onSuivant} />
    </div>
  );
}

export default Etape2;