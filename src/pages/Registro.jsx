import React from 'react'
import imagen from "../images/cubism.jpg"

export default function Registro({form, onChange, onSubmit, onBlur, validaciones, validarPass}) {
    return (
            <div className="principal">
                <h1>Bienvenido al sistema, complete su registro</h1>
            <div className="containerForm">
                <h1>Registro</h1>
                    <form className="formReact" onSubmit={onSubmit}>
                        <div className="imgContainer">
                            <img src={imagen} alt="imagen formulario"/>
                        </div>
                        <div className="inputsContainer">
                            <label htmlFor="correo">Correo</label>
                            <input onChange={onChange} onBlur={onBlur} value={form.correo} type="email" id="correo" name="correo" className="" autoComplete="off" required/>
                            <label htmlFor="usuario">Usuario</label>
                            <input onChange={onChange} onBlur={onBlur} value={form.usuario} type="text" id="usuario" name="usuario"/>
                            <label htmlFor="password">Contraseña</label>
                            <input onChange={onChange} value={form.password} type="password" id="password" name="password" className="" autoComplete="off" required/>
                            <label htmlFor="password">Confirmar contraseña</label>
                            <input onChange={onChange} onBlur={validarPass} value={form.passwordConf} type="password" id="passwordConf" name="passwordConf" className="" autoComplete="off" required/>
                            <input type="submit" className="registroButton" value="Registrarse"/>
                        </div>
                    </form>
            </div>

            <div className="validaciones">
                {validaciones.existeCorreo?<h3>El correo ya existe</h3>:""}
                {validaciones.existeUsuario?<h3>El usuario ya existe</h3>:""}
                {!validaciones.coincidePass?<h3>Las contraseñas no coinciden</h3>:""}
            </div>

            
        </div>
    )
}
