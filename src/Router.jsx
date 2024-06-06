import { Routes, Route } from 'react-router-dom';
import Characters from './pages/Characters/Characters.jsx';
import CharacterDetail from './pages/CharacterDetail/CharacterDetail.jsx';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Characters />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/characters/:characterId" element={<CharacterDetail />} />
    </Routes>
  );
};

export default Router;
