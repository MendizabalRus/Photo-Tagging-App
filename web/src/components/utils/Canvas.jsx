// Packages
import { useState } from 'react';

// Style
import s from '../../style/utils/Canvas.module.css';

// Files
import Character from './Character';

import scenario from '../../public/assets/scenario.webp';
import { useEffect } from 'react';

const Canvas = ({ characters = [], onCharacterFound, isGameOver }) => {
  // useState hooks:
  const [click, setClick] = useState({
    showModal: false,
    x: null,
    y: null,
  });
  const [marks, setMarks] = useState([]);
  const [username, setUsername] = useState('');
  const [time, setTime] = useState(null);
  const [ranking, setRanking] = useState([]);
  // Game logic
  // Record time when loading page
  const startTime = async () => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/game-logic/start-time',
        {
          method: 'POST',
          credentials: "include"
        },
      );

      if (!response.ok) {
        throw new Error("Could not start time");
      }

      const result = await response.json();
      console.log(result)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    startTime();
  }, []);

  // Get user's clicks

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Get coordinates of canvas.

    const x = e.clientX - rect.left; // Get x coordinates relative to canvas.

    const y = e.clientY - rect.top; // Get y coordinates relative to canvas.

    click.showModal
      ? setClick({ showModal: false, x: null, y: null })
      : setClick({ showModal: true, x: x, y: y });
  };

  // Check guesses

  const handleGuess = async (charId) => {
    try {
      const response = await fetch(
        'http://localhost:8080/api/game-logic/guess',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
          body: JSON.stringify({
            x: click.x,
            y: click.y,
            id: charId,
          }),
        },
      );

      const result = await response.json();
      console.log(result)

      setMarks((prev) => [...prev, [result.centerX, result.centerY]]);
      onCharacterFound(result.id);
      setTime(result.timeDelta)

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

  // Register playthrough + show ranking

  useEffect(() => {
    const getRanking = async () => {
      const response = await fetch("http://localhost:8080/api/game-logic/ranking", {
        method: "GET",
        credentials: "include",
      })

      const result = await response.json();
      setRanking(result);
    }

    getRanking();
  }, [])


  const handleSubmit = async () => {
    try {
        const response = await fetch("http://localhost:8080/api/game-logic/register", {
          method: "POST",
          headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({username, time})
        })

        const result = response.json();

        console.log(result);
    } catch (err) {
        console.error(err);
    }
  };

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
              <button type="submit">Register Score</button>
            </form>
          </div>
          <div className={s.ranking}>
            {ranking.map((r, index) => {
              return (
                <div key={r.id} className={s.rankingPlacement}>
                  <p>#{index + 1}</p>
                  <p>{r.username}</p>
                  <p>{(r.time / 1000).toFixed(3)}s</p>
                </div>
              )
            })}
            <hr />
            <div className={s.rankingPlacement}>
              <p>Your time: {(time / 100).toFixed(3)}s</p>
            </div>
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
          <div
            key={[mark[1], mark[0]]}
            style={{
              position: 'absolute',
              top: `${mark[1]}px`,
              left: `${mark[0]}px`,
            }}
            className={s.crosshair}
          ></div>
        );
      })}
      <img src={scenario} alt="Scenario" className={s.scenario} />
    </section>
  );
};
export default Canvas;
