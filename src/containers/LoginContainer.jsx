import md5 from 'md5';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Login from "../pages/Login"
import { collection, query, where , getDocs } from "firebase/firestore";
import db from "../firebase/firebaseConfig"

export default function LoginContainer() {
    const [form, setForm] = useState({usuario:"", password:""});
    const [failLogin, setFailLogin] = useState(false);
    const navigation = useNavigate();
    
    const onChange = (e)=>{
        setForm({...form, [e.target.id]:e.target.value});
    }

    const onSubmit = async (e)=>{
        e.preventDefault();
        const docRef = collection(db, "Usuarios");
        const q = query(docRef, where("usuario", "==", form.usuario), where("password", "==", md5(form.password)));
        const querySnapshot = await getDocs(q);
        if(querySnapshot.size === 1){
            navigation("/mainPage");
        }else{
            setFailLogin(true);
        }
    }

    const irRegistro = ()=>{
        navigation("/Registro")
    }

    return (
        <Login form={form} onSubmit={onSubmit} onChange={onChange} irRegistro={irRegistro} failLogin={failLogin}/>
    )
}
