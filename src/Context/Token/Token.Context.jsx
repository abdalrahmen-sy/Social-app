import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export const TokenConText = createContext(null)

export default function TokenProvider({children}) {
    const [userId, setUserId]= useState('')
    const [token, setToken] = useState(localStorage.getItem('Token'))
      


    function LogOut(){
        setToken(null);
        localStorage.removeItem('Token')
    }
    useEffect(()=>{
        if(token){ 
        const {user}= jwtDecode(token);
        setUserId(user)
    }
   },[token])
   
    return <TokenConText.Provider value={{LogOut,token, setToken , userId}}>
        {children}
    </TokenConText.Provider>
}