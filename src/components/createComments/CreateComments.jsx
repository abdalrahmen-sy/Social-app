import React, { useContext, useState } from 'react'
import { TokenConText } from '../../Context/Token/Token.Context'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';


export default function CreateComments({ post }) {
    const [comment, setComment] = useState('')
    const QueryClient = useQueryClient()
    const { token ,userId } = useContext(TokenConText)
     
    function Handelcomment() {
        const optials = {
            method: 'POST',
            url: 'https://linked-posts.routemisr.com/comments',
            data: {
                content: comment,
                post: post.id
            },
            headers: {
                token,
            }
        }

        return axios.request(optials)
    }
    const { mutate, isPending } = useMutation({
        mutationFn: Handelcomment,
        onSuccess(res) {
            toast.success('create Comment successfully')
            setComment('')
            QueryClient.invalidateQueries(['Get All Post'])
            QueryClient.invalidateQueries(['Get User Post', userId])
            

        },
        onError(error) {
            toast, error(error.request.data.error)
        },

    })






    return (<>
        <div className=" mx-auto">
            <div className="relative ">

                <input
                    value={comment}
                    onChange={(e) => { setComment(e.target.value) }}

                    id="default-search"
                    className=" w-full py-4 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder='create comment'

                />
                <button
                    disabled={isPending}
                    onClick={mutate}

                    className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {isPending ? '...' : 'send'}
                </button>
            </div>
        </div>

    </>)
}
