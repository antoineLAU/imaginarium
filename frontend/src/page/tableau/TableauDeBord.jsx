import { useNavigate } from "react-router-dom";
import Header from "../../conponent/header/Header";
import Bouton from "../../conponent/bouton/Bouton";
import "./TableauDeBord.css";

function TableauDeBord() {
  const navigate = useNavigate();
  const pseudo = localStorage.getItem("pseudo");
  const role = localStorage.getItem("role");

  function deconnexion() {
    localStorage.removeItem("pseudo");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div>
      <Header showNav={false} showConnexion={false} showRejoindre={false} />
      <h1>Tableau de bord</h1>
      <p>Bienvenue, {pseudo}.</p>
      {role === "admin" && <p>Tu es Administrateur.</p>}
      {role !== "admin" && <p>Tu es Utilisateur.</p>}
      {role === "admin" && (
        <div>
          <h2>Partie admin</h2>
          <p>Ici tu pourras gérer les utilisateurs.</p>
        </div>
      )}
      <Bouton texte="Se déconnecter" onClick={deconnexion} />
    </div>
  );
}

export default TableauDeBord;