import Router from './Router.jsx';

import Header from './components/Header/Header.jsx';
import CharactersContextProvider from '@/context/CharactersContext.jsx';

import './App.scss';

function App() {
  return (
    <CharactersContextProvider>
      <Header />
      <Router />
    </CharactersContextProvider>
  );
}

export default App;
