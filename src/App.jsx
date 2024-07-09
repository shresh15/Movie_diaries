import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { Auth } from "./Components/auth";
import { db, auth ,storage} from "./config/firebase";
import { getDocs, collection, addDoc,deleteDoc,doc,updateDoc } from "firebase/firestore"; // in data base we have a bunch of documents
import {ref, uploadBytes} from "firebase/storage"

function App() {
  
  const [movieList, setMovieList] = useState([]);
  const[newMovieTitle,setNewMovieTitle]=useState("");
  const[newReleaseDate,setNewReleaseDate]=useState(0);
  const[isNewMovieOscar,setIsNewMovieOscar]=useState(false)
// Update Movie Title
const[updatedTitle,setUpdatedTitle]=useState("");
//file upload
const[fileUpload,setFileUpload]= useState([])
 
//use effect-directly get rendered
  
  const movieCollectionRef = collection(db, "movies");
  const getMovieList = async () => {
    //Read the dta from data list... Set the movie list
    try {
      const data = await getDocs(movieCollectionRef); //get all the documents under movies
      const filteredData=data.docs.map((doc)=>({
        ...doc.data(),
        id:doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  
  
  // Update Movie Title
  const UpdateMovieTitle=async(id) =>{
    const movieDoc=doc(db,"movies",id);
    await updateDoc(movieDoc,{title :updatedTitle});
  };
  //Delete Movie
const deleteMovie=async(id) =>{
  const movieDoc=doc(db,"movies",id);
  await deleteDoc(movieDoc);
};

  //Upload files
  const uploadFile =async() =>{
    if (!fileUpload) return;
    const filesFolderRef= ref(storage,`projectFiles/${fileUpload.name}`)
    try{
    await uploadBytes(filesFolderRef,fileUpload);
  } catch(err){
    console.error(err)
  }};


  
  useEffect 
    (() => {
      
      getMovieList();
    },[]);

    const onSubmitMovie= async() =>
    { 
      try{
        await addDoc(movieCollectionRef,
      {
        title : newMovieTitle,
        releaseDate : newReleaseDate,
        receivedAnOscar : isNewMovieOscar,
        userId: auth?.currentUser.uid,
      }); 
      getMovieList();
    } catch(err){
        console.error(err);
      }
   }


  return (
    <div className="w-full h-72 pt-5 border-2 border-solid border-white mt-3">
    <div className="App">
      <Auth />
      </div>

      <div className="w-full h-auto border-2 border-solid border-white mt-16">
      <div >
        <div className="mt-5 mb-6 w-1/2 border-2 border-solid border-white m-auto rounded-full">
        <input className="m-auto p-3 w-56 bg-transparent border-none outline-none placeholder-white" placeholder="Movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        /></div>
        <div className="mt-5 mb-6 w-1/2 border-2 border-solid border-white m-auto rounded-full">
        <input className="m-auto p-3 w-56 bg-transparent border-none outline-none placeholder-white" placeholder="Release Date" type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        /></div>
        <div className="w-full">
        <input className="ml-10" type="checkbox" checked={isNewMovieOscar} onChange={(e) =>setIsNewMovieOscar(e.target.checked)}/>
        <label className="text-white mr-5">Recieved an Oscar</label>
        <button className="border-2 ml-10border-solid border-white rounded-full p-2 pl-4 pr-4 text-white hover:text-black hover:bg-gradient-to-r from-slate-100 to-slate-400" onClick={onSubmitMovie}>Submit Movie</button>
        </div>
      </div>

      
      <div>
        {movieList.map((movie) => (
        <div>
          <h1 style={{color:movie.receivedAnOscar?"green":"red"}}>{movie.title}</h1>
          <p>Date : {movie.releaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

          <input placeholder="new Title" onChange={(e) => setUpdatedTitle(e.target.value)}></input>
          <button onClick={() => UpdateMovieTitle(movie.id)}>Update title</button>
         
        </div>
        ))}
      </div>

      <div>
        <input className="text-white ml-2" type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button className="border-2 ml-10border-solid border-white rounded-full p-2 pl-4 pr-4 text-white hover:text-black hover:bg-gradient-to-r from-slate-100 to-slate-400 mt-2 mr-5 mb-2" onClick={uploadFile}>Upload File</button>
      </div>
      <deleteMovie/> 

    </div>
    </div>
      
   
  ); //closing return 
}// closing function app 

export default App;
