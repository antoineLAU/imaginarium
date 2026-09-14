import { useNavigate } from "react-router-dom";
import Header from "../../conponent/header/Header";
import Bouton from "../../conponent/bouton/Bouton";
import PartieAdmin from "../../conponent/tableau/PartieAdmin/PartieAdmin";
import PartieUtilisateur from "../../conponent/tableau/PartieUtilisateur/PartieUtilisateur";
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
      {role === "admin" && <PartieAdmin pseudo={pseudo} />}
      {role !== "admin" && <PartieUtilisateur pseudo={pseudo} />}
      <Bouton texte="Se déconnecter" onClick={deconnexion} />
    </div>
  );
}

export default TableauDeBord;