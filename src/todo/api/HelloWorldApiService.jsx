import { useState,useEffect  } from "react"
import {useAuth} from '../security/AuthContext'
import { apiClient } from "./ApiClientBase"


export const RetrieveWelcome= () =>{

    const [message,setMessage] = useState(null)
    
    useEffect(() => {apiClient.get('/welcome', { withCredentials: true })
    .then((response) => succesfullResponse(response))
    .catch((error) => errorResponse(error)) 
    .finally(() => console.log("cleanup"))}) 
   


    /*apiClient.get('/welcome', { withCredentials: true })
    .then((response) => succesfullResponse(response))
    .catch((error) => errorResponse(error)) 
    .finally(() => console.log("cleanup"))*/
    

    const succesfullResponse = (response) =>{
        const responseData = response.data
        // Set the extracted data to the state variable
        setMessage(responseData)
        console.log(response)
    }

    const errorResponse = (error) =>{
        setMessage(error)
        console.log("Error was called")
    }

    console.log("Here we are")
    return ( <div>{message}</div> )
}

export const RetrieveWelcomeWithPathVariable = ({userName}) => {
  
  const authContext = useAuth()

  const {isAuthenticated,setAuthenticated,login,logout,username,token} = authContext.sharedValues

  const [message, setMessage] = useState(null);


  useEffect(() => {
    apiClient.get(`/welcome/${userName}`,{
      headers:
      {
        Authorization: token
      }
    }, { withCredentials: true })
      .then((response) => successfulResponse(response))
      .catch((error) => errorResponse(error))
      .finally(() => console.log("cleanup in variable " + userName))
  }, [userName]);

  const successfulResponse = (response) => {
    const responseData = response.data;
    setMessage(responseData);
    console.log(message);
  };

  const errorResponse = (error) => {
    setMessage(error);
    console.log("Error: " + error);
  };


  console.log("Here we are");
  return <div>{message}</div>;
};
  

