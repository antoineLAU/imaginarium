function PartieAdmin({ pseudo }) {
  return (
    <div>
      <p>Bienvenue, {pseudo}.</p>
      <p>Tu es Administrateur.</p>
      <h2>Partie admin</h2>
      <p>Ici tu pourras gérer les utilisateurs.</p>
    </div>
  );
}

export default PartieAdmin;