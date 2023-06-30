import {useState} from 'react'
import useAxiosPrivate from "../hooks/useAxiosPrivate";

type newListFormData={
    name:string
    description:string
}

interface ListsProps {
    listChange:boolean
    setListChange:React.Dispatch<React.SetStateAction<boolean>>
}

const CreateList=({listChange, setListChange}:ListsProps)=>{
    const [formData,setFormData]=useState<newListFormData>({name:'',description:''});
    const axiosPrivate=useAxiosPrivate();
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>):void=>{
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }
    const createList = async () =>{
        let isMounted=true;
        const controller=new AbortController();
        try{
            const response=await axiosPrivate.post('list/createList',formData,{
                signal:controller.signal,
            });
            setListChange(listChange?false:true)
            return ()=>{
                isMounted=false;
                controller.abort()
            }
        }catch(error){
            console.log(error);
        }
    }
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(formData.name!==''&&formData.description!==''){
            createList()
        } else {
            alert('required fields are empty')
        }
    }
    return(
        <>
            <div className="create-list-container">
                <div className="list-name-bar">
                    <h5>CREATE NEW LIST</h5>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                        <input type="text" name='name' value={formData.name} className="list-name-input" placeholder="my list name" onChange={handleChange}></input>
                        <input type="text" name='description' value={formData.description} className="list-name-input" placeholder="my list description" onChange={handleChange}></input>
                        <button type="submit" onClick={()=>handleSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export {CreateList}