import React, {useState, useEffect} from "react";
import { v4 as uuidv4 } from 'uuid';
import "./Formulario.css"
import Tabla from "./Tabla";
import { deleteUser, getUser, registrarUsuario, update } from "./api";

// import "./Nombre del archivo.css"


function Formulario(){

    const [datos, setDatos] = useState({
        name: '',
        username: '',
        email: '',
        phone: ''
    })

    const [idUser, setIdUser] = useState(null);
    const [data, setData] = useState ([]);
    
    useEffect ( () => {

        getUsers()

    },[])

    function getUsers() {
        getUser().then ( (response) => {
            setData(response.data)

        })
    }

    function delUser(id) {
        deleteUser(id).then( (response) => {
            getUsers()
          })
    }

    function change( event ) {

        setDatos({
            ...datos,
            [event.target.name] : event.target.value 
        })
    }


   function datosEnviados( event ) {
        event.preventDefault()

        const obj = {
            name: datos.name,
            username : datos.username,
            email: datos.email,
            phone: datos.phone
        }
        
        if(idUser !== null){
            update(idUser,obj).then( (response) => {
                if(response.data){
                    getUsers()
                    setDatos({
                        name: '',
                        username: '',
                        email: '',
                        phone: ''
                    })
                    setIdUser(null);
                }
            })
        } else {
            registrarUsuario({...obj, id: uuidv4()}).then ( (response) => {
                if(response.data){
                    getUsers()
                    setDatos({
                        name: '',
                        username: '',
                        email: '',
                        phone: ''
                    })
                }
            })

        }
    }



    function editUser({id, name, username, email, phone}) {
        if(id) {
            setDatos({
                name,
                username,
                email,
                phone
            })
            setIdUser(id)
        }
    } 
    
    const titleButton = idUser !== null ? 'Modificar' : 'Registrate';

    return(

        <> 
            <div className="center">
                <div className="container">
                    <h1 className="title">Formulario de Registro</h1>
                    <form className="formulario" onSubmit={datosEnviados}>
                        <div>
                            <input className="nape" placeholder="Nombre Completo" name="name" value={datos.name} type="text" onChange={change}/>
                        </div>
                        <div>
                            <input className="alias" placeholder="Nombre de usuario" name="username" value={datos.username} type="text" onChange={change}/>
                        </div>
                        <div>
                            <input className="mail" placeholder="Correo Electronico" name="email" value={datos.email} type="email" onChange={change}/>
                        </div>
                        <div>
                            <input className="number" placeholder="Numero de contacto" name="phone" value={datos.phone} type="number" onChange={change}/>
                        </div>
                        
                        <button type="submit" className="sumit">{titleButton}</button>
                    </form>
                </div>
            </div>


            <Tabla data={data} deleteUser={(id) => delUser(id)} editUser={(item) => editUser(item)} />
        </>
        
    )

}

export default Formulario;