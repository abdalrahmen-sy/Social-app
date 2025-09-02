import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TokenConText } from '../../Context/Token/Token.Context'

export default function GuestRouter({ children }) {
    const { token } = useContext(TokenConText)
    if (token) {

        return <Navigate to={'/Home'} />
    } else {

        return  children 
    }

}
