import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const HomeButton=()=>{
    const navigate=useNavigate();
    const navigateTo=(e:React.MouseEvent<SVGElement, MouseEvent>)=>{
    navigate(`/${e.currentTarget.id}`);
    }
    return (
        <>
            <FaHome size={30} className="activity-icon home-button" id="home" onClick={(e)=>navigateTo(e)}/>
        </>
    )
}

export {HomeButton};