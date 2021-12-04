import md5 from 'md5';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Login from "../pages/Login"
import { collection, query, where , getDocs , doc, setDoc, getDoc} from "firebase/firestore";
import db from "../firebase/firebaseConfig"
import randomToken from "random-token"
import emailjs from 'emailjs-com';

export default function LoginContainer() {
    const [form, setForm] = useState({usuario:"", password:""});
    const [failLogin, setFailLogin] = useState(false);
    const [resetRes, setResetRes] = useState("");

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

    function sendEmail(data){
        emailjs.send('service_376oxga', 'template_3gdy01r', data, 'user_9MkTRMVzC2LVSR5WDrO9N')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    }

    const restablecerPass = async ()=>{
        if(form.usuario === ""){
            setResetRes("Ingrese un usuario")
        }else{
            setResetRes("Si el usuario existe se le enviará un correo para restablcer su contraseña")
            //Se verifica existencia de usuario
            const docRef = collection(db, "Usuarios");
            const q = query(docRef, where("usuario", "==", form.usuario));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.size === 1){ //El usuario existe, se crea token y envia email
                const token = randomToken(16);
                const usuarioRef = doc(db, 'Usuarios', querySnapshot.docs[0].id);
                setDoc(usuarioRef, { token: token }, { merge: true }); //Se ingresa el token a la BD del usuario
                
                const url = `https://crypto-control-acceso-e16.netlify.app/ResetPassword/${token}`; //URL que se enviara
                const docSnap = await getDoc(usuarioRef);
                const data = {
                    to_correo: docSnap.data().correo,
                    to_name: docSnap.data().usuario,
                    message: url
                }
                sendEmail(data);
            }
        }
    }

    return (
        <Login form={form} onSubmit={onSubmit} onChange={onChange} irRegistro={irRegistro} failLogin={failLogin}
        restablecerPass={restablecerPass} resetRes={resetRes}/>
    )
}
