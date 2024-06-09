import { Routes, Route } from 'react-router-dom';
import { Characters, CharacterDetail } from '@/pages/index.js';

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
