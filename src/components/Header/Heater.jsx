import React, { useContext, useState } from 'react'
import { IoIosList } from 'react-icons/io'
import { LiaCommentSlashSolid, LiaCommentSolid } from "react-icons/lia";
import { Link, useParams } from 'react-router-dom';
import { Dropdown, DropdownItem } from "flowbite-react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { TokenConText } from '../../Context/Token/Token.Context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import CreateEdit from '../../Context/createEdit/CreateEdit';


export default function Heater({ name, createdAt, photo, comment, commentId, post, postId, postUserId }) {
    const [open, setOpen] = useState(false);
    const Img = 'https://share.google/images/Q6pMbcImtuyVYfztm'
    const { userId, token } = useContext(TokenConText)
    const { id } = useParams()
    const QueryClient = useQueryClient()
    function deletePostFn() {
        const optiols = {
            method: 'DELETE',
            url: `https://linked-posts.routemisr.com/posts/${postId}`,
            headers: {
                token
            }
        }
        return axios.request(optiols)
    }
    const { mutate: deletePostmutate } = useMutation({
        mutationFn: deletePostFn,
        onSuccess: (res) => {
            toast.success('create Delete Post successfully')
            QueryClient.invalidateQueries(['Get All Post'])
            QueryClient.invalidateQueries(['Get User Post', userId])
        },
        onError: (err) => {
            toast.error(err.request.data.error)
        }
    })
    function deleteCommentFn() {
        const optiols = {
            method: 'DELETE',
            url: `https://linked-posts.routemisr.com/comments/${commentId}`,
            headers: {
                token
            }
        }
        return axios.request(optiols)
    }
    const { mutate: deleteCommentmutate } = useMutation({
        mutationFn: deleteCommentFn,
        onSuccess: (res) => {
            toast.success('create Delete Comment successfully')
            QueryClient.invalidateQueries(['Get All Post'])
            QueryClient.invalidateQueries(['All Comments', id])
            QueryClient.invalidateQueries(['Get User Post', userId])
          
        },
        onError: (err) => {
            toast.error(err.request.data.error)
        }

    })
    return (
        <>
            <div className={`${comment ? 'bg-blue-100  space-y-2 rounded-2xl  my-3' : <></>}`}>

                <div className='post-header flex   items-center justify-between'>
                    <div className="left-part flex items-center gap-2  ">

                        <img onError={(e) => { e.target.src = Img }} src={photo} className="w-14 h-14 rounded-full" alt="" />
                        <div className="info">
                            <h3 className='text-lg font-semibold'>{name}</h3>
                            <h4>{createdAt}</h4>

                        </div>
                    </div>

                    {postUserId == userId && <div className="relative inline-block text-left">

                        <button
                            onClick={() => setOpen(!open)}
                            className="px-4 py-2 rounded-lg">
                            <IoIosList />
                        </button>

                        {/* القائمة */}
                        {open && (
                            <div className="absolute  right-0 mt-2 w-40 bg-gray-400 border rounded-lg shadow-lg z-10">
                                <ul className="py-2">
                                    <li>
                                      <div className=' flex justify-between'> <CreateEdit idPost={postId} idComment={commentId} comment={comment} /></div>         
                                    </li>
                                  
                                    <li>
                                        <button className='  p-2 rounded-2xl  hover:bg-red-600 w-full bg-red-500 text-white text-center' 
                                        onClick={comment ? deleteCommentmutate : deletePostmutate}> <h2>delete</h2></button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>}

                    
                </div>
                {comment && <div className=' flex items-center  justify-between p-3 rounded-2xl   bg-blue-100'>
                    <div className='flex items-center  mx-2 space-x-5'><LiaCommentSolid /><p>{comment}</p></div>
                    <div className='text-blue-950'><Link to={`/Comments/${post.id}`}>View More Comments</Link></div></div>}
            </div >



        </>
    )
}
