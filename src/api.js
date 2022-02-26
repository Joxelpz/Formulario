import axios from "axios";
import {urlApi} from "./config";

export async function deleteUser(id) { 
    try {
       const response = await axios.delete(`${urlApi}/${id}`);
       return response
    } catch (error) {
        console.error(error);
    }
}


export async function getUser() {
    try {
        const response = await axios.get(urlApi);
       return response
    } catch (error) {
      console.error(error);
    }
}

export async function registrarUsuario(obj) {
    try {
        const response = await axios.post(urlApi , obj );
    console.log(obj)

        return response
    } catch (error) {
        console.error(error);
    }
}

export async function update(id,obj) { 
    try {
       const response = await axios.patch(`${urlApi}/${id}` , obj);
       return response
    } catch (error) {
        console.error(error);
    }
}
