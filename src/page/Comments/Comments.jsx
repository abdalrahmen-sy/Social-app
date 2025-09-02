import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TokenConText } from '../../Context/Token/Token.Context'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Post from '../../components/Post/Post'
import { Riple } from 'react-loading-indicators'


export default function Comments() {
    const { id } = useParams()
    const { token } = useContext(TokenConText)
    function getAllComments() {
        const options = {
            method: 'GET',
            url: `https://linked-posts.routemisr.com/posts/${id}`,
            headers: { 
                token,
             }
        }
        return (axios.request(options))
    }

    const { data, error, isLoading, } = useQuery({
        queryKey: ['All Comments',id],
        queryFn: getAllComments
    })
if(isLoading){return  <div className='text-center   justify-center   my-40'><Riple color="#7b1746" size="medium" /></div>}




    return (
        <div className='w-1/2 m-auto my-2 bg-gray-200 rounded-4xl '>
           <Post post={data.data.post} inSingelPage={true}/>
           

        </div>
    )
}
