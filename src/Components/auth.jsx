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
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
        <button onClick={signIn}>Sign In</button>
        <button onClick={signInWithGoogle}>Sign In with google</button>
        <button onClick={Logout}>Logout</button>
        <h1>Authentication</h1>
    </>

    );
};

    