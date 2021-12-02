import React, { useState } from 'react'
import { useNavigate  } from 'react-router';
import md5 from "md5";
import Registro from '../pages/Registro';
import db from "../firebase/firebaseConfig"
import { collection, addDoc, query, where , getDocs } from "firebase/firestore";

export default function RegistroContainer() {
    const [form, setForm] = useState({correo:"", usuario:"", password:"", passwordConf:""});
    const [validaciones, setValidaciones] = useState({existeCorreo:false, existeUsuario:false, coincidePass: true, passLength: 8})
    const navigate = useNavigate ();

    const onChange = (e)=>{
        setForm({...form, [e.target.id]:e.target.value});
    }

    const onSubmit = (e)=>{
      e.preventDefault();
      if(!validaciones.existeCorreo && !validaciones.existeUsuario && validaciones.coincidePass && validaciones.passLength === 8){
        registrar();
      }
    }

    const onBlur = async ()=>{
      
      if(form.correo !== ""){
        const count = await cuantos("correo", form.correo);
        setValidaciones({...validaciones, existeCorreo: count>0?true:false})
      }

      if(form.usuario !== ""){
        const count = await cuantos("usuario", form.usuario);
        console.log(form.usuario);
        setValidaciones({...validaciones, existeUsuario: count>0?true:false})
      }
    }

    const validarPass = ()=>{
      if(form.password !=="" && form.passwordConf !== ""){
        const coincide = form.password===form.passwordConf;
        setValidaciones({...validaciones, coincidePass: coincide});
      }
    }

    const validarPassLength= ()=>{
      setValidaciones({...validaciones, passLength: form.password.length})
    }

    const onPaste = (e)=>{
      e.preventDefault();
    }
    

    async function cuantos(tipo, valor){
      const docRef = collection(db, "Usuarios");
      const q = query(docRef, where(tipo, "==", valor));
      const querySnapshot = await getDocs(q);
      return querySnapshot.size;
    }

    async function registrar(){
        try {
            const docRef = await addDoc(collection(db, "Usuarios"), {
            usuario: form.usuario,
            password: md5(form.password),
            correo: form.correo
          });   
          console.log("Document written with ID: ", docRef.id);
          navigate("/");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    return (
        <Registro form={form} onChange={onChange} onSubmit={onSubmit} onBlur={onBlur} 
        validaciones={validaciones} validarPass={validarPass} onPaste={onPaste}
        validarPassLength={validarPassLength}/>
    )
}
