import {Link} from "react-router-dom";
import { PiNumberCircleFiveFill } from "react-icons/pi";
import './index.css';
const ToDo = () => {
  return(
    <div className="card">
        <div className="card-body" >
            <PiNumberCircleFiveFill className="wd-cardicon" size={25} />
            <Link to={'#'} className="wd-cardlink"> Grade A1 - ENV + HTML</Link>
            <p className="card-text">100 points · Sep 18 at 11:59pm </p>
        </div>
        <div className="card-body" >
            <PiNumberCircleFiveFill className="wd-cardicon" size={25} />
            <Link to={'#'} className="wd-cardlink"> Grade A1 - ENV + HTML</Link>
            <p className="card-text">100 points · Sep 18 at 11:59pm </p>
        </div>
    </div>
    

  )
}
export default ToDo;