// Packages

// Style
import s from "../../style/pages/Home.module.css";

// Files
import Canvas from "../utils/Canvas";
import Characters from "../utils/Characters";
import Timer from "../utils/Timer";

import waldo from "../../assets/waldo.png";
import wilma from "../../assets/wilma.png";
import wizard from "../../assets/wizard.png";

const characters = [
  {
    name: "Waldo",
    img: waldo,
  },
  {
    name: "Wilma",
    img: wilma,
  },
  {
    name: "Wizard",
    img: wizard,
  },
];

const Home = () => {
  return (
    <div className={s.Home}>
      <Canvas characters={characters} />
      <Characters characters={characters} />
      <Timer />
    </div>
  );
};
export default Home;
