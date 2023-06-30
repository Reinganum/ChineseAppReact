import {useState, useEffect} from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ListComponent } from './ListComponent';
import { IList } from '../types/types';

interface ListsProps {
    listChange:boolean
    setListChange:React.Dispatch<React.SetStateAction<boolean>>
}

const Lists=({listChange, setListChange}:ListsProps)=>{
    const axiosPrivate=useAxiosPrivate();
    const [lists, setLists]=useState<(IList[]|[])>([]);
    const getLists = async () =>{
        let isMounted=true;
        const controller=new AbortController();
        try{
            const response=await axiosPrivate.get('list/myLists',{
                signal:controller.signal,
                withCredentials:true,
            });
            isMounted && setLists(response.data);
            console.log(response.data)
            return ()=>{
                isMounted=false;
                controller.abort()
            };
        }catch(error){
            console.log(error);
        };
    }
    useEffect(()=>{
        getLists();
    },[listChange])
    return (
        <>
            {
                lists.length!==0?lists.map((list)=>{
                    return <ListComponent listData={list} setListChange={setListChange} listChange={listChange} key={list._id}/>
                })
                :
                <h1>NO LISTS AVAILABLE</h1>
            }
        </>
    )
}

export {Lists};