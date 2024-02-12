import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../security/AuthContext'
import { useState } from "react";

const RegisterPage = () => {

  const navigate = useNavigate()

  const authContext = useAuth()

  const {register} = authContext.sharedValues

  const [firstName,setFirstName] = useState("")

  const [lastName,setLastName] = useState("")

  const [emailAdress,setEmailAdress] = useState("")

  const [errorMessage,setErrorMessage] = useState("")

  const [password,setPassword] = useState("")

  const [warningMessage,setWarningMessage] = useState (true);

  const {termsOfService,setTermsOfServices} = useState(false)
    
    const validateUser = () =>{



    if(firstName.length<3 || firstName.length>20)
  {
    setErrorMessage("First name's length should be between 2 and 21!")
    setWarningMessage(false)
    return false
  }
  else if
  (lastName.length<3 || lastName.length>20)
  {
    setErrorMessage("Last name's length should be between 2 and 21!")
    setWarningMessage(false)
    return false
  }

  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20}$/

  const emailPattern = /^(?=.{1,64}@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/

  if(!emailPattern.test(emailAdress))
  {
    setErrorMessage("The email you entered is not a valid mail address!")
    setWarningMessage(false)
    return false
  }

  if(!passwordPattern.test(password))
  {
    setErrorMessage("The password is not valid! It should include at least 1 uppercase letter, 1 lowercase letter, 1 symbol (@#$%), and be a minimum of 8 characters and a maximum of 20 characters.")
    setWarningMessage(false)
    return false
  }

  setWarningMessage(false)
  return true
}

const handleFirstNameChange = (event) => {

  setFirstName(event.target.value)
}

  const handleLastNameChange = (event) => {
  setLastName(event.target.value)
}

const handleEmailAdressChange = (event) => {
  setEmailAdress(event.target.value)
}

const handlePasswordChange = (event) => {
  setPassword(event.target.value)
}

const forwardLogin = () => {
  navigate(`/login`)
}

const handleSubmit = async () => {

  console.log("First name: " + firstName)

  const isValid = validateUser()
  if(isValid)
  {
    try {
      if (await register(firstName,lastName,emailAdress,password)) {
          navigate(`/welcome/${firstName}`)
      } else {
          setErrorMessage("There has been a problem with register!")
          setWarningMessage(false)
          
      }
  } catch (error) {
      console.error(error)
  }

}
  }
    return (

<div className="mask d-flex align-items-center h-100 gradient-custom-3">
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-6">
          <div className="card" style={{borderRadius:'15px'}}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">Create an account</h2>

              <div className="error-div mb-4 " style={{width:"100%",height:"auto"}} hidden={warningMessage}>
                    <div className="error-message">{errorMessage}</div>
            </div>

              <form>
                <div className="form-outline mb-4">
                  <input type="text" placeholder="John" onChange={handleFirstNameChange} className="form-control form-control-lg" />
                  <label className="form-label"  defaultValue={firstName}>First Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="text"  placeholder="Smith" defaultValue={lastName} onChange={handleLastNameChange} className="form-control form-control-lg" />
                  <label className="form-label" >Last Name</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="email" id="form3Example4cg" placeholder="mailAddress@domain.com" defaultValue={emailAdress} onChange={handleEmailAdressChange} className="form-control form-control-lg" />
                  <label className="form-label"  >Email Address</label>
                </div>

                <div className="form-outline mb-4">
                  <input type="password" id="form3Example4cdg" placeholder="example@1234" defaultValue={password} onChange={handlePasswordChange} className="form-control form-control-lg" />
                  <label className="form-label" >Password</label>
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label className="form-check-label">
                    I agree all statements in <Link to="/tos" target="_blank" rel="noopener noreferrer" className="text-body"><u>Terms of service</u></Link>
                  </label>
                </div>

                <div className="d-flex justify-content-center">
                  <button type="button"
                    className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onClick={handleSubmit}>Register</button>
                </div>

                <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login" className="fw-bold text-body" onClick={forwardLogin}><u>Login here</u></Link></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
        
    )
}


export default RegisterPage