import CharacterCard from '../../components/CharacterCard/CharacterCard';

import './Characters.scss';

function Characters() {
  return (
    <div className="page-container">
      <div className="character-cards-container">
        <CharacterCard isFavorite />
        <CharacterCard />
        <CharacterCard isFavorite />
        <CharacterCard />
        <CharacterCard isFavorite />
        <CharacterCard />
        <CharacterCard isFavorite />
      </div>
    </div>
  );
}

export default Characters;
