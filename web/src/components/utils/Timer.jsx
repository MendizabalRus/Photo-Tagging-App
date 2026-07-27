// Packages

// Style
import s from "../../style/utils/Timer.module.css";

// Files

const Timer = () => {
    return(
        <div className={s.Timer}>
            <div className={s.text}>
                Timer
            </div>
            <div className={s.timer}>
                0:00.00s
            </div>
        </div>
    )
}
export default Timer;