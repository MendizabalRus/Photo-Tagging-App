// Packages

// Style
import s from '../../style/utils/Characters.module.css';

// Files
import Character from './Character';

const Characters = ({ characters = [] }) => {
  return (
    <div className={s.Characters}>
      <div className={s.text}>Characters</div>
      <div className={s.characters}>
        {characters.map((char) => {
          return <Character key={char.name} name={char.name} img={char.img} />;
        })}
      </div>
    </div>
  );
};
export default Characters;
