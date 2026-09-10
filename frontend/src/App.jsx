import { Routes, Route } from 'react-router-dom'
import Accueil from './page/accueil/Accueil'
import Inscription from './page/inscription/inscription'
import Connexion from './page/connexion/Connexion'
import ExplorerLesCreations from './page/explorer_les_creations/ExplorerLesCreations'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Accueil />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/explorer" element={<ExplorerLesCreations />} />
      <Route path="/explorer/inscription" element={<Inscription />} />
    </Routes>
  )
}

export default App