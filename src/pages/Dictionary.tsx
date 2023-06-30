import { useState } from "react";
import { Character } from "../components/Character";
import { flashcard } from "../types/types";
import { HomeButton } from "../components/HomeButton";

function Dictionary () {
  const [query,setQuery]=useState<string>('')
  const [filter, setFilter]=useState<string>('definition')
  const [data,setData]=useState<flashcard[]>([] as flashcard[])
  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setQuery(e.target.value);
  }
  function changeFilter(e:React.ChangeEvent<HTMLSelectElement>){
    setFilter(e.target.value);
  }
  function getData(){
    if (query){
        const getURL=`http://ccdb.hemiola.com/characters/${filter}/${query}?filter=gb&fields=string,kMandarin,kDefinition,kTotalStrokes,kTraditionalVariant`;
        fetch(getURL)
        .then(response=>response.json())
        .catch(error=>alert(error))
        .then(data=>{
          console.log(data)
            setData(data)
        }
      )} else {
        alert('query empty')
      }
  } 
  return (
    <>
      <div className="main-container search">
        <div className="home-button-container">
          <HomeButton/>
        </div>
        <div>
            <h1>Search in dictionary</h1>
        </div>
        <div className="search-bar-container">
          <input type="search" placeholder="input your query" onChange={handleChange}/>
          <select onChange={changeFilter}>
            <option value="definition">Meaning</option>
            <option value="mandarin">Pronunciation</option>
            <option value="string">Character</option>
          </select>
          <div>
            <button onClick={getData} className='search-button'>Search</button>
          </div>
        </div>
          <div className="dictionary-results-container">
            {data.length!==0&&data.map((characterData, index)=>(
              <>
                <Character key={index} queryData={characterData} index={index}/>
              </>
            ))  
            }
          </div>
          {
            data.length===0&&<h1>NO RESULTS TO DISPLAY</h1>
          }
      </div>
    </>
  );
}

export default Dictionary;