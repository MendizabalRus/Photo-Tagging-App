// Packages
import { useState, useEffect } from 'react';
// Style
import s from '../../style/pages/Home.module.css';

// Files
import Canvas from '../utils/Canvas';
import Characters from '../utils/Characters';
import Timer from '../utils/Timer';

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const getCharacters = async () => {
      const response = await fetch('http://localhost:8080/api/characters', {
        method: 'GET',
      });

      const result = await response.json();
      const chars = result.map((char) => ({ ...char, found: false }));
      setCharacters(chars);
    };

    getCharacters();
  }, []);

  useEffect(() => {
    if (characters.length > 0 && characters.every((char) => char.found)) {
      // eslint-disable-next-line
      setIsGameOver(true);
    }
  }, [characters]);

  const handleFound = (id) => {
    setCharacters((prevCharacters) => {
      return prevCharacters.map((char) => {
        return char.id === id ? { ...char, found: true } : char;
      });
    });
  };

  return (
    <div className={s.Home}>
      <Canvas
        characters={characters}
        onCharacterFound={handleFound}
        isGameOver={isGameOver}
      />
      <Characters characters={characters} />
      <Timer />
    </div>
  );
};
export default Home;
