import { useState , useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { flashcard } from "../types/types";
import { HomeButton } from "./HomeButton";

type FlashcardFormData={
    kMandarin:string,
    kDefinition:string,
}


interface IPopulatedList{
    _id:string,
    name:string,
    characters:flashcard[],
    views:number
}

function TestCard() {
    const axiosPrivate=useAxiosPrivate();
    const [formData,setFormData]=useState<FlashcardFormData>({kMandarin:'',kDefinition:''});
    const [fcIndex,setFcIndex]=useState<number>(0);
    const [score,setScore]=useState<number>(0);
    const [totalScore,setTotalScore]=useState<number>(0);
    const [showScore,setShowScore]=useState<string>('red hidden');
    const [populatedList,setPopulatedList]=useState<IPopulatedList>({_id:'',characters:[],views:0,name:''});
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }
    const handleSubmit=(e:React.SyntheticEvent)=>{
        e.preventDefault();
        const button=e.currentTarget;
        button.setAttribute('disabled','true');
        let meaningScore=0;
        let pronunciationScore=0;
        const meaningsArray=populatedList.characters[fcIndex].kDefinition.split(/[,;]/).map((word)=>word.toLowerCase().trim());
        const meaningsAnswerArray=formData.kDefinition.split(' ');
        const pronunciationsArray=populatedList.characters[fcIndex].kMandarin.split(' ').map((word)=>word.toLowerCase().trim());
        const pronunciationAnswerArray=formData.kMandarin.split(' ');
        meaningsAnswerArray.forEach((word)=>{
            if (meaningsArray.indexOf(word.toLowerCase().trim())!==-1){
                meaningScore++
            }
        })
        pronunciationAnswerArray.forEach((word)=>{
            if (pronunciationsArray.indexOf(word.toLowerCase().trim())!==-1){
                pronunciationScore++
            }
        })
        setTimeout(()=>{
            setShowScore('red hidden');
            (fcIndex<populatedList.characters.length)?setFcIndex(fcIndex+1):setFcIndex(0);
            setFormData({ kMandarin: '', kDefinition: ''})
            button.removeAttribute('disabled')
        },1000)
        if(pronunciationScore!==0&&meaningScore!==0){
            console.log('kDefinition and kMandarin are correct')
            setScore(2)
            setTotalScore(totalScore+2)
            setShowScore('green animate-score')
        } else if (pronunciationScore!==0&&meaningScore===0){
            console.log('kDefinition is wrong but you got the kMandarin correct')
            setScore(1)
            setTotalScore(totalScore+1)
            setShowScore('yellow animate-score')
        } else if (pronunciationScore===0 && meaningScore!==0){ 
            console.log('kDefinition is right but the kMandarin is wrong')
            setScore(1)
            setTotalScore(totalScore+1)
            setShowScore('yellow animate-score')
        } else {
            setScore(0)
            console.log('answers are wrong')
            setShowScore('red animate-score')
        }
    }
    useEffect(()=>{
        const getSelectedList = async () =>{
            let isMounted=true;
            const controller=new AbortController();
            try{
                const response=await axiosPrivate.get('list/getSelectedList',
                {
                    signal:controller.signal,
                    withCredentials: true
                });
                setPopulatedList(response.data);
                console.log(response.data);
                return ()=>{
                    isMounted=false;
                    controller.abort()
                }
                /* HAY QUE HACER UN HANDLING DEL ERROR CUANDO APARECE USER NO AUTHED */
            }catch(error){
                console.log(error);
            }
        }
        getSelectedList()
    },[])
  return (
    <>
        <form>
            <HomeButton/>
            {
                fcIndex<populatedList.characters.length?
                <div className="testcard-container">
                <h1 className="character">{populatedList.characters[fcIndex].string}</h1>
                <h1>Pinyin</h1>
                <input value={formData.kMandarin} onChange={handleChange} type="text"  id="kMandarin" name="kMandarin" onFocus={(e)=>e.target.placeholder=""} />
                <h1>Meaning</h1>
                <input value={formData.kDefinition} onChange={handleChange} type="text"  id="kDefinition" name="kDefinition" onFocus={(e)=>e.target.placeholder=""} />
                <h1 className={showScore} style={{color:showScore.split(' ')[0]}}>{score}</h1>
                <button onClick={handleSubmit}>Check answer</button>
            </div>
            :
            <div className="testcard-container">
                <h1>LIST COMPLETED</h1>
                <button onClick={()=>setTimeout(()=>setFcIndex(0),1000)}>Go again?</button>
            </div>
            }
            <div className="study-session-info">  
                <h1>Characters studied: {`${fcIndex}/${populatedList.characters.length}`}</h1>
                <h1>Total Score: {totalScore}</h1>
            </div> 
        </form>
    </>
  );
}

export default TestCard;