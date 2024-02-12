import { apiClient } from "./ApiClientBase"
export const executeJwtAuthenticationService =async (userName,password) => 
{
    return await apiClient.post(`/register`,{userName,password})
}