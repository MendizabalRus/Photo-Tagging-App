// Packages
import { useState } from 'react';

// Style
import s from '../../style/utils/Canvas.module.css';

// Files
import Character from './Character';

import scenario from '../../public/assets/scenario.webp';

const Canvas = ({ characters = [], onCharacterFound, isGameOver }) => {
  const [click, setClick] = useState({
    showModal: false,
    x: null,
    y: null,
  });
  const [marks, setMarks] = useState([]);
  const [username, setUsername] = useState("");

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Get coordinates of canvas.

    const x = e.clientX - rect.left; // Get x coordinates relative to canvas.

    const y = e.clientY - rect.top; // Get y coordinates relative to canvas.

    click.showModal
      ? setClick({ showModal: false, x: null, y: null })
      : setClick({ showModal: true, x: x, y: y });
  };

  const handleGuess = async (charId) => {
    try {
      const response = await fetch('http://localhost:8080/api/guess', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          x: click.x,
          y: click.y,
          id: charId,
        }),
      });

      const result = await response.json();
      console.log(result.centerX, result.centerY)
      console.log(result.id)

      setMarks((prev) => [...prev, [result.centerX, result.centerY]])
      onCharacterFound(result.id);

      setClick({
        showModal: false,
        x: null,
        y: null,
        guessedCharacterId: null,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    /*
    try {
        const response = await fetch("http://localhost:8080/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username})
        })
    } catch (err) {
        console.error(err);
    }
    */
  }

console.log(marks)
console.log(click)

  return (
    <section className={s.Canvas} onClick={(e) => handleClick(e)}>
      {isGameOver && (
        <div className={s.gameOverModal} onClick={(e) => e.stopPropagation()}>
          <div className={s.register}>
            <h2>Register your score!</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <button type='submit'>Register Score</button>
            </form>
          </div>
          <div className={s.ranking}>
            <p>#1 00:00.000s username1</p>
            <p>#2 00:00.000s username2</p>
            <p>#3 00:00.000s username3</p>
            <p>#4 00:00.000s username4</p>
            <p>#5 00:00.000s username5</p>
            <hr />
            <p>#yourTime 00:00.000s you</p>
          </div>
        </div>
      )}
      {click.showModal && (
        <div
          style={{
            position: 'absolute',
            top: click.y + 3,
            left: click.x,
          }}
          onClick={(e) => e.stopPropagation()}
          className={s.guessModal}
        >
          <div className={s.crosshair}></div>
          <div className={s.characters}>
            {characters.map((char) => {
              return (
                <Character
                  key={char.id}
                  name={char.name}
                  img={char.img}
                  found={char.found}
                  onClick={() => handleGuess(char.id)}
                />
              );
            })}
          </div>
        </div>
      )}
      {marks.map((mark) => {
        return (
            <div key={[mark.centerX, mark.centerY]} style={{position: 'absolute', top: `${mark[1]}px`, left: `${mark[0]}px`}} className={s.crosshair}></div>
        )
      })}
      <img src={scenario} alt="Scenario" className={s.scenario} />
    </section>
  );
};
export default Canvas;
