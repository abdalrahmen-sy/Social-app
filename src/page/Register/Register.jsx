import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as zod from "zod";
import imgBg from '../../../public/background.jpg'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';

export default function Register() {


  const [isLoding , setIsLoding ]=useState(false)
   const Navigate =useNavigate()
  

  const schama = zod.object({
    name: zod.string('mane mast be valid').nonempty('name is required').min(3, 'name must be minmum 3 chars').max(20, 'name must be maximum 20 chars'),
    email: zod.email('email mast be valid').nonempty('name is required').min(3, 'name must be minmum 3 chars').max(20, 'name must be maximum 20 chars'),
    password: zod.string('pissowrd mast be string').regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=\S+$).{8,32}$/, 'Password must be at least 8 chars, include uppercase, lowercase, a number and a special character'),
    rePassword: zod.string('repissowrd mast be string'),
    dateOfBirth: zod.coerce.date().refine((value) => { return new Date().getFullYear() - value.getFullYear() >= 18 }, 'age mast be bigger then 18'),
    gender:zod.enum(['male','female'],'gender is re')
  }
  ).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["repassword"],
  });
  const { handleSubmit, register, formState, setError } = useForm(
    {
      defaultValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        dateOfBirth: '',
        gender: ''

      },
      mode: 'onSubmit',
      resolver: zodResolver(schama)
    })

    
    
    
    async function sendDateToRegister(values) {
      const lodingId = toast.loading('loading...')
      setIsLoding(true)
      try{
        const options ={
          method:'POST',
          url:"https://linked-posts.routemisr.com/users/signup" ,
          data:values
        }
          const {data} = await axios.request(options)
          toast.success('account registerd successfully')
          Navigate('/Login')
        }
    catch (error) { 
      toast.error(error.response.data.error);} 
      finally{
        toast.dismiss(lodingId)
        setIsLoding(false)
     
      }
  }


  return (<>

    <div className=' min-h-screen w-full '>
      <img src={imgBg} className='h-screen bg-cover  w-full bg-center relative' />
      <div>
        <form onSubmit={handleSubmit(sendDateToRegister)} className=' absolute mr-22 space-y-1 bg-[#162938]/90 h-fit  left-[30%]  text-gray-400  justify-items-center rounded-3xl top-1/4 w-150' >
          <h1 className='text-3xl font-semibold text-gray-300 mb-8'>Register Form</h1>
          <div className='flex flex-col gap-1'>
            <label htmlFor="mane" className='text-xl font-semibold'>usermane</label>
            <input type="text"  {...register("name")} id='name' placeholder='usermane' className='focus:outline-blue-900  focus:outline-2  focus:outline-dotted w-135  ' />
            {formState.dirtyFields.name && formState.errors.name && <p className='text-red-500 text-lg font-semibold m-auto'>{formState.errors.name.message}</p>}
          </div>

          <div className='flex flex-col gap-1'><label htmlFor="email" className='text-xl font-semibold'>useremail</label>
            <input type="text" id='email'{...register("email")} className='focus:outline-blue-900  focus:outline-2  focus:outline-dotted w-135  ' placeholder='useremail' />
            {formState.dirtyFields.email && formState.errors.email && <p className='text-red-500 m-auto text-lg font-semibold'>{formState.errors.email.message}</p>}
          </div>

          <div className='flex flex-col gap-1'><label htmlFor="password" className='text-xl font-semibold'>userpassowrd</label>
            <input type="text" id='password' {...register("password")} className=' w-135 focus:outline-blue-900  focus:outline-2  focus:outline-dotted ' placeholder='userpassord' />
            {formState.dirtyFields.password && formState.errors.password && <p className=' m-auto text-red-500 text-lg font-semibold'>{formState.errors.password.message}</p>}
          </div>


          <div className='flex flex-col gap-1'><label htmlFor="rePassword" className='text-xl font-semibold'>rePassword</label>
            <input type="text" id='rePassword'{...register("rePassword")} className='focus:outline-blue-900  focus:outline-2  focus:outline-dotted w-135  ' placeholder='repassword' />
            {formState.dirtyFields.rePassword && formState.errors.rePassword  && <p className='text-red-500 m-auto text-lg font-semibold'>{formState.errors.rePassword.message}</p>}
          </div>


          <div className='flex flex-col gap-1'><label htmlFor="ateOfBirth" className='text-xl font-semibold'></label>
            <input type="date" id='dateOfBirth' {...register("dateOfBirth", { valueAsDate: true })} className='focus:outline-blue-900  focus:outline-2  focus:outline-dotted w-135  ' /></div>
          {formState.dirtyFields.dateOfBirth && formState.errors.dateOfBirth && <p className='text-red-500 m-auto text-lg font-semibold'>{formState.errors.dateOfBirth.message}</p>}



          <fieldset className='w-full  '>


            <div className="flex items-center  mx-7 mb-2 ">
              <input {...register("gender")} type="radio" name="gender" value="female" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="gender" className="block ms-2  text-sm font-medium text-gray-900 dark:text-gray-300">
                female
              </label>
              </div>
              <div className='flex mb-1 items-center mx-7'>
              <input {...register("gender")} type="radio" name="gender" value="male" className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor="gender" className="block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Male
              </label>
            </div>

          </fieldset>

          <div>
            <button  disabled={isLoding? true : false} className='w-55 h-10 rounded-4xl  mb-2 bg-blue-950  '>Add Register </button>
          </div>
        </form></div>

    </div></>)
}

