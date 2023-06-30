import {FaImage} from "react-icons/fa";
import { useState , useEffect} from "react";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UserData=()=>{
    const {auth}=useAuth();
    const [avatar,setAvatar]=useState<string>(auth.avatar)
    const axios=useAxiosPrivate();
    const [file, setFile] = useState<File>();
    const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
      };
    const handleUpload=async()=>{
        if (!file) {
            return;
          }
        const formData=new FormData();
        formData.append('myFile',file)
        try{
            const avatarUploaded=await axios.post('auth/uploadFile', formData)
            if(avatarUploaded){
                setAvatar('/'+file.name)
                auth.avatar='/'+file.name
            }
        } catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
    },[avatar,auth])
    return(
        <>
            <div className="personal-info-container">
                <div className="avatar-container">
                    <img className='avatar' key={auth.avatar} src={`http://localhost:8080/avatar${auth.avatar}`}></img>
                    <form className="avatar-form">
                        <input type='file' name='myFile' onChange={(e)=>handleFileChange(e)} />
                        <input type="button" value="Upload avatar" onClick={handleUpload} />
                    </form>
                </div>
                <div className="personal-info">
                </div>
            </div>
        </>
    )
}

export {UserData}