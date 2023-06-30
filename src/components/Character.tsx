import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useAuth from "../hooks/useAuth"
import { flashcard } from "../types/types"

interface prop{
    queryData:flashcard,
    index:number
}

const Character=({queryData,index}:prop):JSX.Element=>{
    const axiosPrivate=useAxiosPrivate();
    const {auth}=useAuth();
    const addCharacter=async()=>{
        let isMounted=true;
        const controller=new AbortController();
        try{
            const response=await axiosPrivate.put(`list/newChar`,{newCharacter:queryData,list:auth.selectedList},{
                signal:controller.signal,
                withCredentials: true
            });
            console.log(response.data)
            return ()=>{
                isMounted=false;
                controller.abort()
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div key={index} className="dictionary-character-container">
            <h1>{queryData.string}</h1>
            <h5>{queryData.kMandarin}</h5>
            <h5>{queryData.kDefinition}</h5>
            <h5 className='bottom-value'>Total Strokes: {queryData.kTotalStrokes}</h5>
            <button onClick={()=>addCharacter()}>Add to study list</button>
        </div>
    );
}

export {Character};