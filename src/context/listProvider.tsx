import {createContext, useState} from 'react';

export interface props {
    children: React.ReactNode | React.ReactNode[]
}

interface IListContext {
    selectedList:string,
    setSelectedList: React.Dispatch<React.SetStateAction<string>>
}

const ListContext=createContext({} as IListContext);

export const ListProvider=({ children }: props )=>{
    const [selectedList,setSelectedList]=useState<string>('');
    return (
        <ListContext.Provider value={{selectedList,setSelectedList}}>
            {children}
        </ListContext.Provider>
    )
} 
export default ListContext;