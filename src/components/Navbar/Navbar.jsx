import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { TokenConText } from '../../Context/Token/Token.Context';
import { HiOutlineLogin } from "react-icons/hi";
import Settinds from '../Settings/Settinds';



export default function Navbar() {

    const { LogOut, token } = useContext(TokenConText)
    return (

        <div className='  px-5 flex  bg-gray-800/75 p-4 justify-between items-center'>
            <Link to={token ? '/Home' : '/Register'} className=' px-3 '><h2 className=' font text-white font-semibold text-2xl'>SOCIAL APP</h2></Link>
            <ul className=' flex gap-4 content-center  '>
                {token ? <><li>
                    <NavLink className='text-white  px-2 btn relative ' to={'/Home'}>Home</NavLink>

                </li>
                    <li>
                        <NavLink className='text-white  px-2 btn relative ' to={'/Profile'}>Profile</NavLink>

                    </li>
                     
                    <li>
                     <NavLink className='duration '><Settinds  /></NavLink>   
                    </li>

                </> : <> <li>
                    <NavLink className=' text-white relative btn text-center px-2' to={'/Register'}>Register</NavLink>
                </li>
                    <li>
                        <NavLink className='text-white px-2 relative btn' to={'/Login'}>Login</NavLink>
                    </li>

                </>}
            </ul>
        </div>

    )
}
