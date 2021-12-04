import { collection, getDoc, getDocs, query, where, doc, updateDoc, deleteField, setDoc } from '@firebase/firestore';
import md5 from 'md5';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import db from '../firebase/firebaseConfig';
import ResetPass from '../pages/ResetPass'

export default function ResetPassContainer() {
    const {token} = useParams();
    const [form, setForm] = useState({password:"", passwordConf:""});
    const [coincidePass, setCoincidePass] = useState(true);
    const [usuario, setUsuario] = useState("");
    const navigation = useNavigate();

    const onChange = (e)=>{
        setForm({...form, [e.target.id]:e.target.value});
    }

    useEffect(() => {
        async function verificarToken(){
            const docRef = collection(db, "Usuarios");
            const q = query(docRef, where("token", "==", token));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.size === 1){
                const usuarioRef = doc(db, 'Usuarios', querySnapshot.docs[0].id);
                const docSnap = await getDoc(usuarioRef);
                setUsuario(docSnap.data().usuario);
                await updateDoc(usuarioRef, { token: deleteField()}); //Elimna el token para ser de un solo uso
            }else{
                if(usuario === ""){
                    navigation("/");
                }
            }
        }
        verificarToken(); 
    }, [navigation, token, usuario])

    const onSubmit = async (e)=>{
        e.preventDefault();
        setCoincidePass(form.password === form.passwordConf);
        if(form.password === form.passwordConf){
            //Se cambia la contraseña
            const docRef = collection(db, "Usuarios");
            const q = query(docRef, where("usuario", "==", usuario));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.size === 1){
                const usuarioRef = doc(db, 'Usuarios', querySnapshot.docs[0].id);
                setDoc(usuarioRef, { password: md5(form.password) }, { merge: true }); //Se ingresa la nueva contraseña
                navigation("/");
            }
        }
    }

    return (
        <ResetPass form={form} onSubmit={onSubmit} onChange={onChange} coincidePass={coincidePass}/>
    )
}
