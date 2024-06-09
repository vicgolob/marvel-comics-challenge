import { useLocation } from 'react-router-dom';

function CharacterDetail() {
  const location = useLocation();
  const { state: locationState } = location;
  console.log(locationState);

  return <h1>Character Detail Page!</h1>;
}

export default CharacterDetail;
