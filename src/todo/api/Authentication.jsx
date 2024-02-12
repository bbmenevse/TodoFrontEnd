import { apiClient } from "./ApiClientBase"
export const executeJwtAuthenticationService = async (userName,password) => 
{
    return await apiClient.post(`/login`,{userName,password})
    //Changed to login, Old name Authentication
}