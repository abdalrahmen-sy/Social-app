import React, { useContext } from 'react'
import { TokenConText } from '../../Context/Token/Token.Context'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter({children}) {
const {token}=useContext(TokenConText)
    if (token) {

        return children
    } else {
        
        return <Navigate to={'/Login'} />
    }
}
