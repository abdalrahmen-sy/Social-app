import React, { useContext, useEffect, useState } from 'react'
import CreatePost from './../../components/CreatePost/CreatePost';
import { TokenConText } from '../../Context/Token/Token.Context';
import { Riple } from 'react-loading-indicators';
import { useQuery } from '@tanstack/react-query';
import Post from '../../components/Post/Post';
import axios from 'axios';
import { FaTransgender } from "react-icons/fa";
import Settinds from '../../components/Settings/Settinds';

export default function Profile() {
  const { userId, token  } = useContext(TokenConText)
  

  function getUserPost() {
    const options = {
      method: 'GET',
      url: `https://linked-posts.routemisr.com/users/${userId}/posts`,
      headers: {
        token,
      }

    }
    return axios.request(options)
  }

  const { data, error, isError, isLoading, isFatching } = useQuery({
    queryKey: ['Get User Post', userId],
    queryFn: getUserPost,
    enabled: !!userId

  })

  
  // {str}

  
 
   
 
  
  if (isLoading) { return <div className='text-center   justify-center   my-40'><Riple color="#7b1746" size="medium" /></div> }
  
  
  return <>
          
    <div className=' bg-gray-200 my-2 w-1/2 space-y-3 mx-auto   rounded-2xl' ><CreatePost /> </div>
    <div className=' bg-gray-200 my-2 w-1/2 space-y-3 mx-auto p-5 ' >
      {data?.data.posts.map((post) => <Post key={post._id} post={post} inSingelPage={false} />)}

    </div>




  </>

}
