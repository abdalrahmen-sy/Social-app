import React, { useContext, useState } from 'react'
import * as zod from "zod";
import imgBg from '../../../public/background.jpg'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { TokenConText } from './../../Context/Token/Token.Context';

export default function Login() {
  const [isLoding , setIsLoding ]=useState(false)
  const {setToken}=useContext(TokenConText)
  const Navigate =useNavigate()
    const schama = zod.object({
        email: zod.email('email mast be valid').nonempty('name is required').min(3, 'name must be minmum 3 chars'),
        password: zod.string('pissowrd mast be string').regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=\S+$).{8,32}$/, 'Password must be at least 8 chars, include uppercase, lowercase, a number and a special character'),
    });
    const { handleSubmit, register, formState, setError } = useForm(
        {
            defaultValues: {
                email: '',
                password: '',
            },
            mode: 'onSubmit',
            resolver: zodResolver(schama)
        })

    async function sendDateToLogin(values) {
        const lodingId = toast.loading('loading...')
      setIsLoding(true)
      try{
        const options ={
          method:'POST',
          url:"https://linked-posts.routemisr.com/users/signin" ,
          data:values
        }
          const {data} = await axios.request(options)
          toast.success('account registerd successfully')
          
          
          localStorage.setItem('Token',data.token)
          Navigate('/home')
          setToken(data.token)
        }
    catch (error) { 
      toast.error(error.response.data.error)} 
      finally{
        toast.dismiss(lodingId)
        setIsLoding(false)
     
      }


    }



    return (<>
        <div className=' min-h-screen w-full '>
            <img src={imgBg} className='h-screen bg-cover  w-full bg-center relative' />

            <div>
                <form onSubmit={handleSubmit(sendDateToLogin)} className=' absolute mr-22 space-y-1 bg-[#162938]/90 h-fit  left-[30%]  text-gray-400  justify-items-center rounded-3xl top-1/4 w-150' >
                    <h1 className='text-3xl font-semibold text-gray-300 mb-8'>Register Form</h1>


                    <div className='flex flex-col gap-1'><label htmlFor="email" className='text-xl font-semibold'>useremail</label>
                        <input type="text" id='email'{...register("email")} className='focus:outline-blue-900  focus:outline-2  focus:outline-dotted w-135  ' placeholder='useremail' />
                        {formState.dirtyFields.email && formState.errors.email && <p className='text-red-500 m-auto text-lg font-semibold'>{formState.errors.email.message}</p>}
                    </div>

                    <div className='flex flex-col gap-1'><label htmlFor="password" className='text-xl font-semibold'>userpassowrd</label>
                        <input type="text" id='password' {...register("password")} className=' w-135 focus:outline-blue-900  focus:outline-2  focus:outline-dotted ' placeholder='userpassord' />
                        {formState.dirtyFields.password && formState.errors.password && <p className=' m-auto text-red-500 text-lg font-semibold'>{formState.errors.password.message}</p>}
                    </div>
                    <div>
                        <button  disabled={isLoding? true : false} className='w-55 h-10 rounded-4xl  mb-2 bg-blue-950  '>Add Register </button>
                    </div>
                </form></div>
            </div>
           </>

        )
}
