import React, { useContext, useRef, useState } from 'react'
import { TokenConText } from '../../Context/Token/Token.Context';
import {
  HiInformationCircle,
  HiLogin,
  HiPencil,
} from "react-icons/hi";
import { FaImage, FaTransgender, FaUserTie } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { data, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from "date-fns";
import { IoSettings } from "react-icons/io5";

export default function Settinds() {
  const [isOpen, setIsOpen] = useState(false);
  const {token ,LogOut}=useContext(TokenConText);
  const inputImage = useRef(null);
    
    function getSettings() {
      const options = {
        method: 'GET',
        url: 'https://linked-posts.routemisr.com/users/profile-data',
        headers: {
          token,
        }
        
      }
      return axios.request(options)
    }
  
    const {data} = useQuery({
      queryKey: ['Get Settings'],
    queryFn: getSettings,
  })
  
  const user=data?.data.user
  console.log(user);
 
  
  
  return (
    
    <>
      <div className="flex items-center justify-center">
        {/* زر فتح القائمة */}
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 flex items-center gap-2 py-1 hover:bg-gray-800 bg-gray-500 text-white rounded-lg"
        >
          Settings
         <IoSettings />
        </button>

        {/* الـ Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="text-2xl font-bold">Settings</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-600">
              ✖
            </button>
          </div>

          {/* روابط القائمة */}
          <ul className="p-3 space-y-2">
            <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaUserTie />name:{user?.name}
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <AiTwotoneMail />email:{user?.email}
            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaBirthdayCake />Birthday:{user &&format(new Date(user?.dateOfBirth), "MM/dd/yyyy")}

            </li>
            <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
              <FaTransgender />gender:{user?.gender}
            </li>
          </ul>

          <div className="border-t mt-2 p-3">
            <ul className="space-y-2">
              <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                
                <NavLink onClick={LogOut} className=' flex items-center gap-1 ' to={'/Login'}><HiLogin /> login</NavLink>
              </li>
              <li className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <NavLink onClick={LogOut} className=' flex items-center gap-1' to={'/Register'}><HiPencil /> Create a naw account</NavLink>
              </li>

            <>
            
            <div className="flex items-center justify-between">
            <li></li>
                <input
                  type="file"
                  className="hidden"
                    ref={inputImage}
                  />
                <div className="text-blue-700 flex items-center ps-2">
                  <FaImage />
                  <h2>Upload your img</h2>
                </div>
            
            </div></>
          
                  </ul>
            
          </div>
        </div>

        {/* خلفية سوداء عند الفتح */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-blue-300/40 bg-opacity-40 z-40"
          ></div>
        )}
      </div></>   
   
  )
}
