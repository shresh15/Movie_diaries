import { useState } from 'react';
import {auth,googleProvider} from '../config/firebase'
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
export const Auth=() =>
{
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");
    //most functions are asynchronous and return a promise..we can also use .then , .catch
    const signIn=async() =>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);

        } catch(err){
            console.error(err);
        }
    };

    const signInWithGoogle=async() =>{
        try{
            await signInWithPopup(auth,googleProvider);

        } catch(err){
            console.error(err);
        }    
    };

    const Logout=async() =>{
        try{
            await signOut(auth);

        } catch(err){
            console.error(err);
        }
        
        
    };
    return (
    <>
        <div className="mt-5 mb-6 w-1/2 border-2 border-solid border-white m-auto rounded-full">
        <input className="block m-auto p-3 w-56 bg-transparent border-none outline-none placeholder-white" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="mt-5 mb-6 w-1/2 border-2 border-solid border-white m-auto rounded-full">
        <input className="block m-auto p-3 w-56 bg-transparent border-none outline-none placeholder-white" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="m-auto w-96 flex justify-between mb-10 mt-8">
        <button className="ml-3 border-2  border-collapse border-white rounded-full p-2 pl-4 pr-4 text-white hover:text-black hover:bg-gradient-to-r from-slate-100 to-slate-400" onClick={signIn}>Sign In</button>
        <button className="border-2 border-solid border-white rounded-full p-2 pl-4 pr-4 text-white hover:text-black hover:bg-gradient-to-r from-slate-100 to-slate-400" onClick={signInWithGoogle}> Sign In With Google</button>
        <button className="mr-3 border-2 borrder-solid border-white rounded-full p-2 pl-4 pr-4 text-white hover:text-black hover:bg-gradient-to-r from-slate-100 to-slate-400" onClick={Logout}>Logout</button>
        </div>
        
    </>

    );
};

    