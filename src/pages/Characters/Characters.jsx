import CharacterCard from '../../components/CharacterCard/CharacterCard';

import './Characters.scss';

function Characters() {
  return (
    <div className="character-cards-container">
      <CharacterCard isFavorite />
      <CharacterCard />
      <CharacterCard isFavorite />
      <CharacterCard />
      <CharacterCard isFavorite />
    </div>
  );
}

export default Characters;
