import React from 'react'

export default function MainPage({cerrarSesion}) {
    return (
        <div className="mainPageClass">
            <h1>Bienvenido a la página principal</h1>
            <button onClick={cerrarSesion} className="salir">Salir</button>
        </div>
    )
}
