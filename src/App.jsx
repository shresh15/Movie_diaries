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
    <div className="App">
      <Auth />
      <div >
        <input placeholder="Movie title"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input placeholder="release date" type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e) =>setIsNewMovieOscar(e.target.checked)}/>
        <label>Recieved an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
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
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
      <deleteMovie/> 

    </div>

      
   
  ); //closing return 
}// closing function app 

export default App;
