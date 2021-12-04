import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import MainPage from '../pages/MainPage'

export default function MainPageContainer() {
    const navigation = useNavigate(); 

   useEffect(() => {
    if(localStorage.getItem("sesion") !== "true"){
        navigation("/");
    }
   }, [navigation]);

   const cerrarSesion = ()=>{
        localStorage.setItem("sesion", "false");
        navigation("/");
   }

    return (
        <MainPage cerrarSesion={cerrarSesion}/>
    )
}
