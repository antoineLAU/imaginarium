function Bouton({ texte, onClick }) {
  return (
    <button onClick={onClick}>{texte}</button>
  );
}

export default Bouton;