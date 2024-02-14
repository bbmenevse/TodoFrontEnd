import { createContext, useContext, useState } from "react";
import {loginServiceApi,registerServiceApi} from "../api/TodoApiService"
import { apiClient } from "../api/ApiClientBase";


export const AuthContext = createContext()


export const useAuth = () =>
{
    return useContext(AuthContext)
}

const AuthProvider = ({children}) =>{

    const [isAuthenticated, setAuthenticated] = useState(false)

    const [userName,setUserName] = useState(null)

    const [token, setToken] = useState(null)

    const register = async (firstName,lastName,emailAdress,password) => {

        try{
            const response = await registerServiceApi(firstName,lastName,emailAdress,password)
            console.log(response)
            if(response.status==200)
            {
            setAuthenticated(true)
            setUserName(userName)
            const jwToken = "Bearer " + response.data.token
            setToken(jwToken)
            apiClient.interceptors.request.use(
                (config) => {
                    console.log("Intercepting: " + jwToken)
                    config.headers.Authorization = jwToken
                    return config
                },
                (error) => {
                    return Promise.reject(error)
                }
            )
            return true
            }
            else{
                console.log("Error in register function in Auth")
                logout()
                return false
            }
        }
        catch(error){
            console.log("Error in register function")
            logout()
            return false
        }
            
    }

    const login = async (userName,userPassword) => {

        try{

            const response = await loginServiceApi(userName,userPassword)
            //console.log("Response status: " + response.data)
            if(response.status==200)
            {
            const jwToken = "Bearer " + response.data.token
            setAuthenticated(true)
            setUserName(userName)
            setToken(jwToken)
            apiClient.interceptors.request.use(
                (config) => {
                    console.log("Intercepting: " + jwToken)
                    config.headers.Authorization = jwToken
                    return config
                },
                (error) => {
                    return Promise.reject(error)
                }
            )
            return true
            }
            else{
                console.log("Error in login function in Auth")
                logout()
                return false
            }
        }
        catch(error){
            console.log("Error in login function")
            logout()
            return false
        }
            
    }

    

    const logout = () => {
        setAuthenticated(false)
        setUserName(null)
        setToken(null)
    }



    const sharedValues = {isAuthenticated, setAuthenticated,login,logout,register,userName,token}

    //setInterval(() => setAuthLevel(authLevel+1),10000)

    return(
        <AuthContext.Provider value = {{sharedValues}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider