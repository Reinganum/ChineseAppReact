import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useAuth from "../hooks/useAuth"
import {FaEye} from "react-icons/fa";
import { IList } from "../types/types";

interface prop{
    listData:IList
    listChange:boolean
    setListChange:React.Dispatch<React.SetStateAction<boolean>>
}

const ListComponent=({listData, setListChange, listChange}:prop):JSX.Element=>{
    const {auth,setAuth}=useAuth();
    const axiosPrivate=useAxiosPrivate();
    const selectList=async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        let isMounted=true;
        const controller=new AbortController();
        const selectedListID=e.currentTarget.id
        try{
            const response=await axiosPrivate.post('list/selectList',{listID:selectedListID},{
                signal:controller.signal,
                withCredentials: true
            });
            const updatedSelectedList=auth;
            updatedSelectedList.selectedList=selectedListID;
            setAuth(updatedSelectedList)
            setListChange(listChange?false:true)
            return ()=>{
                isMounted=false;
                controller.abort()
            }
        }catch(error){
            console.log(error)
        }
    };
    const removeList=async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, list:IList)=>{
        let isMounted=true;
        const controller=new AbortController();
        const listID=e.currentTarget.id
        try{
            const response=await axiosPrivate.post('list/removeList',{_id:listID},{
                signal:controller.signal,
                withCredentials: true
            });
            setListChange(listChange?false:true)
            return ()=>{
                isMounted=false;
                controller.abort()
            }
        }catch(error){
            console.log(error)
        }
    }
    
    return (
        <div className={`list ${auth.selectedList==listData._id ? "selected" : ""}`} key={listData._id} id={listData._id}>
            <div className="list-data">
                <h1>{listData.name}</h1>
                <h4>Characters: {listData.characters.length}</h4>
                <h4>{listData.description}</h4>
            </div>
            <button id={listData._id} onClick={(e)=>selectList(e)}>Select List</button>
            <button id={listData._id} onClick={(e)=>removeList(e, listData)}>Remove List</button>
            <FaEye size={30} className="activity-icon visibility"/>
        </div>
    );
}

export {ListComponent};