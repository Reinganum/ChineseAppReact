import {useContext} from 'react';
import ListContext from '../context/listProvider';

const useSelectedList=()=>{
    return useContext(ListContext);
}

export default useSelectedList;