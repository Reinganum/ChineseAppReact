import { useState , useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IPopulatedList } from "../types/types";
import { HomeButton } from "./HomeButton";
import useAuth from "../hooks/useAuth";

function StudyCard() {
    const {auth}=useAuth()
    const axiosPrivate=useAxiosPrivate();
    const [populatedList,setPopulatedList]=useState<IPopulatedList>({_id:'',characters:[],views:0,name:''});
    const [fcIndex,setFcIndex]=useState<number>(0);
    const [bgColor,setBgColor]=useState<string>('');
    const chooseBgColor=(tone:string)=>{
      switch (tone) {
        case '1':
          setBgColor('blue');
          break;
        case '2':
          setBgColor('green');
          break;
        case '3':
          setBgColor('orange');
          break;
        case '4':
          setBgColor('purple');
          break;
      }
    }
    const changeCard=async()=>{
      fcIndex<populatedList.characters.length?setFcIndex(fcIndex+1):setFcIndex(0);
      const _id=populatedList.characters[fcIndex]._id
      try {
        const response=await axiosPrivate.put('list/studyCounter', {_id});
        console.log(response)
      } catch (error){
        console.log(error)
      }
    }
    useEffect(()=>{
      const populateSelectedList = async () =>{
          let isMounted=true;
          const controller=new AbortController();
          try{
              const response=await axiosPrivate.get('list/getSelectedList',
              {
                  signal:controller.signal,
                  withCredentials:true,
              });
              setPopulatedList(response.data)
              if(response.data.pron!==undefined){
                const mainPron=response.data.characters[0].kMandarin.split(' ')[0]
                const tone=mainPron.charAt(mainPron.length-1)
                chooseBgColor(tone)
              }
              return ()=>{
                  isMounted=false;
                  controller.abort()
              }
              /* HAY QUE HACER UN HANDLING DEL ERROR CUANDO APARECE USER NO AUTHED */
          }catch(error){
              console.log(error);
          }
      }
      populateSelectedList()
  },[])
  useEffect(()=>{
    if (populatedList.characters[0]!==undefined){
      if (populatedList.characters[fcIndex].kMandarin){
      const mainPron=populatedList.characters[fcIndex].kMandarin.split(' ')[0]
      const tone=mainPron.charAt(mainPron.length-1)
      chooseBgColor(tone)
      }
    }
  },[fcIndex])
  return (
    <>
      <div>
        <HomeButton/>
        {
          populatedList.characters.length!==0&&populatedList.characters[fcIndex].rating.filter((rating)=>rating.studentId===auth.userId&&rating.visits===0).length!==0?
          <h1>New Character!</h1>
          :
          <h1>OOOLD ONE</h1>
        }
        {
          populatedList.characters.length!==0?
          <div className='testcard-container' style={{backgroundColor: bgColor}}>
            <div>
            <h1 className="character">{populatedList.characters[fcIndex].string}</h1>
            </div>
            <div className="character-info">
              <h3>{populatedList.characters[fcIndex].kMandarin}</h3>
              <h3 className="definition-text">{populatedList.characters[fcIndex].kDefinition}</h3>
            </div>
            {
              fcIndex<populatedList.characters.length-1?
              <button onClick={()=>changeCard()}>Change card</button>
              :
              <button onClick={()=>setFcIndex(0)}>Study again</button>
            }
            <div className="study-session-info">  
              <h1>Characters studied: {`${fcIndex+1}/${populatedList.characters.length}`}</h1>
            </div> 
          </div>
          :
          <h1>No loaded list</h1>
        }
      </div>
    </>
    )}
  


export default StudyCard;