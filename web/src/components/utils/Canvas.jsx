// Packages
import { useState } from 'react';

// Style
import s from '../../style/utils/Canvas.module.css';

// Files
import Character from './Character';

import scenario from '../../assets/scenario.webp';

const Canvas = ({ characters = [] }) => {
  const [guessModal, setGuessModal] = useState({
    show: false,
    x: null,
    y: null,
  });

  const [click, setClick] = useState({ char: null, x: null, y: null });

  const handleClick = (e) => {
    const rect = e.target.getBoundingClientRect(); // Get coordinates of canvas.

    const x = e.clientX - rect.left; // Get x coordinates relative to canvas.

    const y = e.clientY - rect.top; // Get y coordinates relative to canvas.

    guessModal.show
      ? setGuessModal({ show: false, x: null, y: null })
      : setGuessModal({ show: true, x: x, y: y });
  };

  const handleCheck = async ({ char }) => {
    setClick({ char: char });

    /*
    try {
      const response = await fetch('http://localhost:8080/api/click', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(click),
      });

      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
    */
  };

  return (
    <section className={s.Canvas} onClick={(e) => handleClick(e)}>
      {guessModal.show && (
        <div
          onClick={() => setGuessModal({ show: false })}
          style={{
            position: 'absolute',
            top: guessModal.y + 3,
            left: guessModal.x,
          }}
          className={s.guessModal}
        >
          <div className={s.crosshair}></div>
          <div className={s.characters}>
            {characters.map((char) => {
              return (
                <Character
                  key={char.name}
                  name={char.name}
                  img={char.img}
                  onClick={() => handleCheck(char.name)}
                />
              );
            })}
          </div>
        </div>
      )}
      <img src={scenario} alt="Scenario" className={s.scenario} />
    </section>
  );
};
export default Canvas;
