import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const AuthenticateRoute = ({ children }) => {
    const navigate = useNavigate()
    const token = localStorage.getItem("accessToken")
    return token ? children : <Navigate to='/login' />
}

export default AuthenticateRoute