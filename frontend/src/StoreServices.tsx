import axios from "axios";
import { LoginDataType, RegisterDataType } from "./type/Authenticate";

class StoreServices {
    async fetchSingleProduct(id:string) {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
        return response.data
    }

    async login (data:LoginDataType) {
        return await axios.post('https://api.escuelajs.co/api/v1/auth/login', {'email': data.email, 'password': data.password});
    }

    async createNewUser (data:RegisterDataType) {
        return await axios.post('https://api.escuelajs.co/api/v1/users/', {'email': data.email, 'password': data.password})
    }

}

export default StoreServices