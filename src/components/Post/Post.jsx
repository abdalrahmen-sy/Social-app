import React, { useContext } from 'react'
import { FcLike } from 'react-icons/fc'
import { FaCommentDots, FaShareAlt } from 'react-icons/fa'
import { IoIosList } from 'react-icons/io'
import Heater from '../Header/Heater'

import { Link } from 'react-router-dom'
import CreateComments from '../createComments/createComments'
import Comments from './../../page/Comments/Comments';
export default function Post({ post, inSingelPage }) {

  const frestcomment = post.comments[0]
  

  return (
    <><div className='space-y-3'>

      <div key={post._id} className=" space-y-5 post rounded-lg    p-5 ">
        <Heater postId={post._id} commentId={null} postUserId={post.user._id} comment={null} name={post.user.name} createdAt={post.createdAt} photo={post.user.photo} Post={post} />
        <div className="post-body ">
          <p>{post.body}</p>
          {post.image && <img src={post.image} className='w-full rounded-2xl' alt="" />}
        </div>
        <div className=" flex items-center  p-2 justify-between post-footer">
          <div className=' flex gap-3'>
            <FcLike className='cursor-pointer hover:fill-red-600 hover:text-red-600' />
            <h5>like</h5>
          </div>
          <div className='cursor-pointer flex gap-3'>
            <FaCommentDots />
            <h5> <Link to={`/Comments/${post.id}`}>Comments {post.comments.length}</Link></h5>
          </div>
          <div className='cursor-pointer flex gap-3'>
            <FaShareAlt />
            <h5>like</h5>
          </div>
        </div>
        <CreateComments post={post} />
        {!inSingelPage && frestcomment && <Heater commentId={frestcomment._id} postUserId={frestcomment.commentCreator._id}  comment={frestcomment.content} name={frestcomment.commentCreator.name} key={frestcomment._id} createdAt={frestcomment.createdAt} photo={frestcomment.photo} post={post} />}
        {inSingelPage && post.comments.reverse().map((comment) => <Heater commentId={comment._id} postUserId={comment.commentCreator._id} comment={comment.content} name={comment.commentCreator.name} key={comment._id} createdAt={comment.createdAt} photo={comment.photo} post={post} />)}
      </div>

    </div >
    </>
  )
}
