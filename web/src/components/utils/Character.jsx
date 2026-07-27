// Packages

// Style
import s from '../../style/utils/Character.module.css';

// Files

const Character = ({ name, img }) => {
  return (
    <div className={s.Character}>
      <img src={img} alt={name} />
    </div>
  );
};
export default Character;
