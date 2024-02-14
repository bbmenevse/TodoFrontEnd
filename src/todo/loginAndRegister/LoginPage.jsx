import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../security/AuthContext'
import { Link } from 'react-router-dom'

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
                
            } else {
                console.log("There was an error.")
                setSuccessMessage(false)
                
            }
        } catch (error) {
            console.error(error)
        }
    }

    return(


<section className="vh-10" >
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-10 col-md-8 col-lg-6">
        <div className="card" style={{borderRadius:"1rem"}}>
          <div className="row g-0 d-flex align-items-center">
            <div className="col-12">
              <div className="card-body p-4 p-lg-5 text-black">
                <form>
                  <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing:"1px"}}>Sign into your account</h5>
                  <div className="error-div col-12 mb-4" hidden={successMessage}>
                    <div className="error-message">Username and password don't match! </div>
            </div>
                  <div className="form-outline mb-4">
                    <input type="text" defaultValue={userName} onChange={handleUserNameChange}  className="form-control form-control-lg" />
                    <label className="form-label">Email address</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input type="password" defaultValue={userPassword} onChange={handleUserPasswordChange} className="form-control form-control-lg" />
                    <label className="form-label">Password</label>
                  </div>
                  <div className="pt-1 mb-4">
                    <button className="btn btn-dark btn-lg btn-block" onClick={handleSubmit} type="button">Login</button>
                  </div>

                  <p className="mb-5 pb-lg-2" style={{color:"#393f81"}}>Don't have an account? <Link to="/register" className="fw-bold text-body" ><u>Register here</u></Link></p>
                  <Link to="/tos" target="_blank" rel="noopener noreferrer" className="text-body"><u>Terms of service</u></Link>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


    )

}

export default LoginPage