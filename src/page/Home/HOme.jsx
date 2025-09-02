import axios from 'axios'
import React, { useContext } from 'react'
import { TokenConText } from '../../Context/Token/Token.Context'
import { Riple } from 'react-loading-indicators'
import Post from '../../components/Post/Post'
import { useQuery } from '@tanstack/react-query'
import CreatePost from '../../components/CreatePost/CreatePost'


export default function HOme() {
  const { token, setToken } = useContext(TokenConText)



  function getAllPost() {
    const options = {
      method: 'GET',
      url: 'https://linked-posts.routemisr.com/posts?limit=10&sort=-createdAt',
      headers: {
        token,
      }
      
    }
    return axios.request(options)
  }

  const { data, error, isError, isLoading, isFatching } = useQuery({
    queryKey: ['Get All Post'],
    queryFn: getAllPost,
    refetchOnMount:false,

  })
  console.log(data);
  

   if(isLoading){return  <div className='text-center   justify-center   my-40'><Riple color="#7b1746" size="medium" /></div>}

  

   
  
  
  return <>


      <div className=' bg-gray-200 my-2 w-1/2 space-y-3 mx-auto   rounded-2xl' ><CreatePost/> </div>
    <div className=' bg-gray-200 my-2 w-1/2 space-y-3 mx-auto p-5 ' >

      {data.data.posts.map((post) => <Post key={post._id} post={post}  inSingelPage={false}/>)}</div></> }
