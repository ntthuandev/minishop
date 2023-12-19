import React, { useEffect, useState } from "react";
import imageDb from "../../config/Config";
// import { getDownloadURL, listAll, uploadBytes } from "firebase/storage";
import { getDownloadURL, listAll, uploadBytes } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";
import { v4 } from "uuid";

function UploadImage(){
    const [img, setImg] =useState({})
    const [imgUrl, setImgUrl] = useState("");

    const handleClick = async () =>{
     if(img !== null){
        const id = v4();
       const imgRef = storageRef(imageDb, `files/${id}`);
        await uploadBytes(imgRef,img).then(value=>{
            console.log(value)
            getDownloadURL(value.ref).then(url=>{
               setImgUrl(url)
               console.log(url)
            })
        })
     }
    }
    //console.log(imgUrl)

    // useEffect(()=>{
    //     listAll(storageRef(imageDb,"files")).then(imgs=>{
    //         console.log(imgs)
    //         imgs.items.forEach(val=>{
    //             getDownloadURL(val).then(url=>{
    //                 setImgUrl(data=>[...data,url])
    //             })
    //         })
    //     })
    // },[])


    return(
        <div className="App">
                <input type="file" onChange={(e)=>setImg(e.target.files[0])} /> 
                <button onClick={handleClick}>Upload</button>
                <br/>
                {imgUrl && (<img src={imgUrl} height="200px" width="200px" />)}        
        </div>
    )
}
export default UploadImage;
