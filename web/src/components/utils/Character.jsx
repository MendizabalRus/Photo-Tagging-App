// Style
import s from '../../style/utils/Character.module.css';

const Character = ({ name, found, onClick }) => {
  console.log(found)
  return (
    <div onClick={onClick} className={s.Character}>
      <img src={`http://localhost:8080/images/${name?.toLowerCase()}.png`} alt={name} className={ found ? s.image : ""}/>
    </div>
  );
};
export default Character;
