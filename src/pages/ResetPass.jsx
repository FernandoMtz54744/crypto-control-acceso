import React from 'react'
import imagen from "../images/cubismLogin.jpg"

export default function ResetPass({form, onChange, onSubmit, coincidePass}) {
    return (
        <div className="principal">
                <h1>Bienvenido al sistema, ingrese su nueva contraseña</h1>
            <div className="containerForm">
                <h1>Restablcer</h1>
                    <form className="formReact" onSubmit={onSubmit}>
                        <div className="imgContainer">
                            <img src={imagen} alt="imagen formulario"/>
                        </div>
                        <div className="inputsContainer">
                            <label htmlFor="usuario">Contraseña</label>
                            <input onChange={onChange} value={form.password} type="password" id="password" name="password" autoComplete="off" required/>
                            <label htmlFor="passwordConf">Confirmar contraseña</label>
                            <input onChange={onChange} value={form.passwordConf} type="password" id="passwordConf" name="passwordConf" autoComplete="off" required/>
                            <input type="submit" className="registroButton" value="Guardar"/>
                        </div>
                        
                    </form>
            </div>
            
            <div className="validaciones">
                {coincidePass?"":<h3>Las contraseñas no coinciden</h3>}
            </div>
        </div>
    )
}
