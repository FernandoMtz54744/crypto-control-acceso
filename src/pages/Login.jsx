import React from 'react'
import imagen from "../images/cubismLogin.jpg"

export default function Login({form, onChange, onSubmit, irRegistro, failLogin}) {
    return (
        <div className="principal">
                <h1>Bienvenido al sistema, inicie sesión</h1>
            <div className="containerForm">
                <h1>Login</h1>
                    <form className="formReact" onSubmit={onSubmit}>
                        <div className="imgContainer">
                            <img src={imagen} alt="imagen formulario"/>
                        </div>
                        <div className="inputsContainer">
                            <label htmlFor="usuario">Usuario</label>
                            <input onChange={onChange} value={form.usuario} type="text" id="usuario" name="usuario"/>
                            <label htmlFor="password">Contraseña</label>
                            <input onChange={onChange} value={form.password} type="password" id="password" name="password" className="" autoComplete="off" required/>
                            <input type="submit" className="registroButton" value="Iniciar sesión"/>
                            <button className="regButton" onClick={irRegistro}> Registrarse</button>
                            <button className="forgetPass" onClick={irRegistro}> Restablecer contraseña</button>
                        </div>
                        
                    </form>
            </div>
            
            <div className="validaciones">
                {failLogin?<h3>Datos incorrectos</h3>:""}
            </div>
        </div>
    )
}
