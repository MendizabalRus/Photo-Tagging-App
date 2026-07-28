// Style
import s from '../../style/utils/Character.module.css';

const Character = ({ name, onClick }) => {
  return (
    <div onClick={onClick} className={s.Character}>
      <img src={`http://localhost:8080/images/${name?.toLowerCase()}.png`} alt={name} />
    </div>
  );
};
export default Character;
