import React from "react";
import "./Tabla.css"


function Tabla(props){


    const {data, deleteUser, editUser} = props;
    
    
    return(

        <div className="center-table">
            <div className="container-table">
                <table>
                    <thead>
                        <tr>
                            <th className="th">Nombre</th>
                            <th className="th">Usuario</th>
                            <th className="th">Email</th>
                            <th className="th">Telefono</th>
                            <th className="th">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map ((item,index) => {
                            return (
                                <tr key={index}>
                                    <td className="td">{item.name}</td>
                                    <td className="td">{item.username}</td>
                                    <td className="td">{item.email}</td>
                                    <td className="td">{item.phone}</td>
                                    <td>
                                        <button className="edit" onClick={() => editUser(item)}>Editar</button>
                                        <button className="delete" onClick={() => deleteUser(item.id)}>Borrar</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {data.length === 0 && <div>No se encontraron resultados</div>}
            </div>
        </div>
        
    )

}

export default Tabla;