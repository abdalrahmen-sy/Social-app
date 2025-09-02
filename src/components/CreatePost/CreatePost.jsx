import React, { useContext, useRef, useState } from 'react'
import { FaImage } from 'react-icons/fa'
import { TbXboxX } from "react-icons/tb";
import { TokenConText } from '../../Context/Token/Token.Context';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';


export default function CreatePost() {
    const [openMode, setOpenMode] = useState(null)
    const [imge, setImge] = useState('')
    const inputImage = useRef('')
    const bodyInput = useRef('')
    const { token } = useContext(TokenConText)
    const queryClient = useQueryClient()
    function handelOpenMode() {
        setOpenMode(true)
    };
    function handelCloseModel() {
        setOpenMode(false)
    }
    function addImge() {
        setImge(URL.createObjectURL(inputImage.current.files[0]))

    }
    function closeImge() {
        setImge(false)
    }

    function handelSendPost() {
        const myform = new FormData
        if (bodyInput.current.value) {
            myform.append('body', bodyInput.current.value)
        }
        if (inputImage.current.files[0]) {
            myform.append('image',inputImage.current.files[0])
        }

        const optials = {
            method: 'POST',
            url: 'https://linked-posts.routemisr.com/posts',
            headers: {
                token
            },
            data: myform

        }
        return axios.request(optials)
    }

    const { mutate } = useMutation({
        mutationFn: handelSendPost,
        onSuccess:(res)=>{
            toast.success('create Post successfully')

            queryClient.invalidateQueries(['Get All Post'])
            setImge('')
        },
        onError:(err)=>{
            toast.error(err.request.data.error)

        }
    })


    return (<div className=' space-y-4 bg-white'>
        {!openMode && <div onClick={handelOpenMode} >
            <input type="text" placeholder='what is in your mind.....' className='    py-2 focus:rounded-2xl   bg-gray-300 w-full ps-1.5 ' />
        </div>
        }
        {openMode && <div className=' bg-gray-300 bg-fixed  space-y-3 rounded-2xl'>
            <input ref={bodyInput} type="text" placeholder='what is in your mind.....'
                className='    py-2 focus:rounded-2xl border border-gray-400 border- bg-white  w-full ps-1.5 ' />
            {imge && <div className='relative'>  <img className='w-full rounded-2xl' src={imge} alt="" />
                <div className='absolute top-3 end-2 bg-red-500 rounded-full text-white p-1'
                    onClick={closeImge}><TbXboxX size={30} /></div>
            </div>}
            <div className='flex items-center justify-between'>
                <label className='flex'>
                    <input type="file" className='hidden ' ref={inputImage} onChange={addImge} />
                    <div className=' text-blue-700 flex items-center ps-2'>
                        <FaImage />
                        <h2>Uploed your img</h2>
                    </div>

                </label>
                <div className=' space-y-3' >
                    <button className='p-2 rounded-2xl  text-white  bg-red-500' onClick={handelCloseModel}>Close</button>
                    <button className='p-2 rounded-2xl m-2 text-white  bg-blue-500' onClick={mutate} >Post</button>
                </div>
            </div>


        </div>}
    </div>
    )
}
