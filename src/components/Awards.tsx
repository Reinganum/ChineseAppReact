import {FaTrophy} from "react-icons/fa";
import { HomeButton } from "./HomeButton";

const Awards=()=>{
    const awards=[{name:"launched", description:"you practiced one list ten times", thumbnail:''},
                  {name:"welcome",description:"you created your account in chineseApp"},
                  {name:"perfectionist", description:"you practiced one list ten times"},
                  {name:"bookworm", description:"you practiced one list ten times"},
                  {name:"persistence", description:"you practiced one list ten times"},
                  {name:"welcome",description:"you created your account in chineseApp"},
                  {name:"perfectionist", description:"you practiced one list ten times"},
                  {name:"bookworm", description:"you practiced one list ten times"}
                ]
    return(
    <>
    
        <div className="main-container-column">
            <div className="home-button-container">
                <HomeButton/>
            </div>
            <h1>YOUR TROPHY ROOM!</h1>
            <div className="award-container">
            {
                awards.length!==0?awards.map((award)=>{
                    return (
                    <div className="locked-award">
                        <FaTrophy size={80} className="trophy-icon"/>
                        <span className="description">{award.description}</span>
                    </div>
                )})
                :
                <h1>NO LISTS AVAILABLE</h1>
            }
            </div>
        </div>
    </>
)}

export {Awards}