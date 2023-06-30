import { FaBookReader , FaBrain , FaMedal , FaCrosshairs} from "react-icons/fa";
import { useNavigate , useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ActivitiesBar=()=>{
    const {auth}=useAuth();
    const location=useLocation();
    const navigate=useNavigate();
    const from=location.state?.from?.pathname||'/';  
    const navigateTo=(e:React.MouseEvent<SVGElement, MouseEvent>)=>{
      navigate(`/${e.currentTarget.id}`);
    }
    return(
    <>
       <div className="activity-icons-container">
            <FaBookReader size={30} className="activity-icon" id="dictionary" onClick={(e)=>navigateTo(e)}/>
            <FaBrain size={30} id="study" className="activity-icon"  onClick={(e)=>navigateTo(e)}/>
            <FaMedal size={30} id="test" className="activity-icon" onClick={(e)=>navigateTo(e)}/>
            <FaCrosshairs size={30} id="awards" className="activity-icon" onClick={(e)=>navigateTo(e)}/>
        </div>
    </>
)}

export {ActivitiesBar}