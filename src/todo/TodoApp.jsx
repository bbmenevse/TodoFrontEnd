import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom"
import {useAuth} from './security/AuthContext'
/* Components */
import LoginPage from "./loginAndRegister/LoginPage"
import RegisterPage from "./loginAndRegister/RegisterPage"
import PageNotFound from "./pageNotFound/PageNotFound"
import WelcomePage from "./welcome/WelcomePage"
import ListTodos from "./todo/ListTodos"
import Header from './commons/Header'
import TermsOfService from "./termsOfService/TermsOfService"
import Footer from './commons/Footer'
import AuthProvider from "./security/AuthContext"
/*          Css          */
import "./TodoApp.css";

const AuthenticatedRoute = ({children}) =>{ 
    const authContext = useAuth()
    if(authContext.sharedValues.isAuthenticated)
    {
        return children
    }
    return <Navigate to="/"/>
}

export default function TodoApp(){
    return(
        <div className="todoApp">
            <AuthProvider>
                <BrowserRouter>
                <div className="div-wrapper">
                    <Header/>
                    <Routes>
                        <Route path="/"element={<LoginPage/>}></Route>
                        <Route path="/tos"element={<TermsOfService/>}></Route>
                        <Route path="/login"element={<LoginPage/>}></Route>
                        <Route path="/register"element={<RegisterPage/>}></Route>
                        <Route path="/welcome/:userName" element={
                        <AuthenticatedRoute><WelcomePage/></AuthenticatedRoute>}></Route>
                        <Route path="*"element={<PageNotFound/>}></Route>
                        <Route path="/todos/:userName"element={<AuthenticatedRoute><ListTodos/></AuthenticatedRoute>}></Route>
                    </Routes>
                </div>
                    <Footer/>
                </BrowserRouter>
            </AuthProvider>
        </div>
    )

}