import { Link } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className="d-flex align-items-center justify-content-center ">
        <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
            <p className="lead">
                The page you’re looking for doesn’t exist.
              </p>
              <Link to="/login" className="fw-bold text-body"><button type="button" className='btn btn-primary'>Home</button></Link>
              
              
        </div>
    </div>
    )
}

export default PageNotFound