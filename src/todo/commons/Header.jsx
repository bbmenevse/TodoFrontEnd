import "./css/header.css"
import { Link } from "react-router-dom";
import {useAuth} from '../security/AuthContext'


const Header = () => {

    //This Works too
    //const authContext = useContext(AuthContext)
    //console.log(authContext.authLevel)

    
    const authContext = useAuth()
    const isAuthenticated = authContext.sharedValues.isAuthenticated
    //console.log(isAuthenticated)

    const logout = () =>
    {
        authContext.sharedValues.logout()
    }

    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
        <div className="container">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="https://www.google.com">Google</a>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to={`/welcome/${authContext.sharedValues.userName}`}>Home</Link></li>}
                            {isAuthenticated  && <li className="nav-item fs-5"><Link className="nav-link" to={`/todos/${authContext.sharedValues.userName}`}>Todos</Link></li> }
                        </ul>
                    </div>
                    <ul className="navbar-nav">
                        {!isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/login">Login</Link></li>}
                        {!isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" to="/register">Register</Link></li>}
                        {isAuthenticated && <li className="nav-item fs-5"><Link className="nav-link" onClick={logout} to="/logout">Logout</Link></li>}
                    </ul>
                </nav>
            </div>
        </div>
    </header>
    )
}




export default Header