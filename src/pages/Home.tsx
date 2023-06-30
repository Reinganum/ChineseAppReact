import {Lists} from "../components/Lists";
import {useState} from "react";
import { useNavigate , useLocation } from "react-router-dom";
import { ActivitiesBar } from "../components/ActivitiesBar";
import { CreateList } from "../components/CreateList";
import { UserData } from "../components/UserData";

const Home=():JSX.Element=>{
    const [listChange, setListChange]=useState<boolean>(false);
    const location=useLocation();
    const navigate=useNavigate();
    const from=location.state?.from?.pathname||'/';  
    const navigateTo=(e:React.MouseEvent<SVGElement, MouseEvent>)=>{
      navigate(`/${e.currentTarget.id}`);
    }
    return (
      <>
          <div className="main-container">
            <div className="layout-container">
                <UserData/>
                <div className="list-container">
                  <h1>MY LISTS</h1>
                  <CreateList listChange={listChange} setListChange={setListChange}/>    
                  <Lists listChange={listChange} setListChange={setListChange}/>
                </div>
                <ActivitiesBar/>
            </div>
          </div>
      </>
    );
  }
  
  export {Home};
  