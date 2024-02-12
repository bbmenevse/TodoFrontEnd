import { Link, useParams } from "react-router-dom";
import {RetrieveWelcome,RetrieveWelcomeWithPathVariable} from "../api/HelloWorldApiService"
import { useState } from "react";


const WelcomePage = () =>
{
    const params = useParams()
    const [check,setCheck] = useState(false)
    const callHelloWorldRestApi = () =>
    {
        setCheck(true)
    }

    //const [message,setMessage] = useState(null)


    /*
    const callHelloWorldRestApi = () =>{
        axios.get('http://localhost:8080/welcome', { withCredentials: true })
        .then((response) => succesfullResponse(response))
        .catch((error) => errorResponse(error)) 
        .finally(() => console.log("cleanup"))
    }

    const succesfullResponse = (response) =>{

        const responseData = response.data
        
        // Set the extracted data to the state variable
        setMessage(responseData)

        console.log(message)
    }

    const errorResponse = (error) =>{
        setMessage(error)
        console.log("Error was called")
    }
    */

    return(
    <div className="container">
        <div> Parameter: {params.userName} </div>
        <div>
            Your todos : <Link to="/todos"> Link </Link>
        </div>
        <div>
            <button className="btn btn-success" onClick={callHelloWorldRestApi}>
                Call Rest Api
            </button>
        </div>
        <div className="text-info"> {check && <RetrieveWelcomeWithPathVariable userName={params.userName}/>}</div>

        <div></div>
    </div>
        
    )
}

export default WelcomePage