import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../security/AuthContext'

//Old version
 const LoginPage = () =>{


    const [userName,setUserName] = useState("22qwe@gmail.com")

    const [userPassword,setUserPassword] = useState("Geeks@portal20")

    const [successMessage,setSuccessMessage] = useState (true);

    const authContext = useAuth()

    const {login} = authContext.sharedValues

    const navigate = useNavigate()

    const handleUserNameChange = (event) => {
        setUserName(event.target.value)
    }

    const handleUserPasswordChange = (event) => {
        setUserPassword(event.target.value)
        //console.log(event.target.value)
    }


    const handleSubmit = async () => {
        try {
            if (await login(userName, userPassword)) {
                setSuccessMessage(true)
                navigate(`/welcome/${userName}`)
                console.log("handlesubmit await")
            } else {
                console.log("There was an error.")
                setSuccessMessage(false)
                
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container">
            <div className="error-div" hidden={successMessage}>
                    <div className="error-message">Username and password don't match! </div>
            </div>
            <div className="login-form">
                <div className="login-area">
                    <label className="login-label">User Name 
                        <input className="loginInput" type="text" name="username" defaultValue={userName} onChange={handleUserNameChange}></input>
                    </label>
                </div>
                <div className="password-area">
                    <label className="login-label">Password 
                        <input className="loginInput" type="password" name="password" defaultValue={userPassword} onChange={handleUserPasswordChange}></input>
                    </label>
                    
                </div>
                <div className="button-area">
                    <label>
                        <button className="login-button" type="button" name="login" onClick={handleSubmit}>Login</button>
                    </label> 
                </div>
            </div>
        </div>

    )

}

export default LoginPage