import React, { useContext, useRef, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import { useParams } from "react-router-dom";
import { TokenConText } from "../Token/Token.Context";

export default function CreateEdit({ idPost  ,comment ,idComment}) {
    const [openModal, setOpenModal] = useState(false);
     const {id}=useParams()
    const inputImage = useRef(null);
    const bodyInput = useRef(null);
    const QueryClient = useQueryClient()
    const { token ,userId } = useContext(TokenConText)
    const [imge, setImge] = useState("");

    function addImge() {
        if (inputImage.current?.files[0]) {
            setImge(URL.createObjectURL(inputImage.current.files[0]));
        }
    }

    function handelOpenMode() {
        setOpenModal(true);
    }

    function handelCloseModel() {
        setOpenModal(false);
        setImge("");
        if (bodyInput.current) bodyInput.current.value = "";
    }

    function handelEditPost() {
        const myform = new FormData();

        if (bodyInput.current?.value) {
            myform.append("body", bodyInput.current.value);
        }

        if (inputImage.current?.files[0]) {
            myform.append("image", inputImage.current.files[0]);
        }

        const optials = {
            method: "PUT",
            url: `https://linked-posts.routemisr.com/posts/${idPost}`,
            headers: {
                token,
            },
            data: myform,
        };

        return axios.request(optials);
    }
    function handelEditComment() {
        const optials = {
            method: "put",
            url: `https://linked-posts.routemisr.com/comments/${idComment}`,
            data:{
                 content: bodyInput.current.value 
                },
            headers: {
                token,
            },
        };

        return axios.request(optials);
    }

    const { mutate: editPost } = useMutation({
        mutationFn: handelEditPost,
        onSuccess: (res) => {
            toast.success("Post created successfully");
            setImge("");
            if (bodyInput.current) bodyInput.current.value = "";
            QueryClient.invalidateQueries(['Get All Post'])
            QueryClient.invalidateQueries(['All Comments', id])
            QueryClient.invalidateQueries(['Get User Post', userId])
        },
        onError: (err) => {
            toast.error(err.response.data.error);
        },
    });
    const { mutate: editComment } = useMutation({
        mutationFn: handelEditComment,
        onSuccess: (res) => {
            toast.success("Post created successfully");
            
            if (bodyInput.current) bodyInput.current.value = "";
            QueryClient.invalidateQueries(['Get All Post'])
            QueryClient.invalidateQueries(['All Comments', id])
            QueryClient.invalidateQueries(['Get User Post', userId])
        },
        onError: (err) => {
            toast.error(err.response.data.error);
        },
    });



    return (
        <>
            <Button className="w-full rounded-2xl" onClick={handelOpenMode}>
                Edit <MdOutlineEdit />
            </Button>

            <Modal show={openModal} size="md" popup onClose={handelCloseModel}>
                <ModalHeader>Edit Post</ModalHeader>
                <ModalBody>
                    <div className="space-y-3">
                        <input
                            type="text"
                            ref={bodyInput}
                            placeholder="what is in your mind....."
                            className="py-2 rounded-2xl border border-gray-400 bg-white w-full ps-1.5"
                        />

                        {imge && (
                            <div className="relative">
                                <img
                                    className="w-full rounded-2xl"
                                    src={imge}
                                    alt="preview"
                                />
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <label className="flex cursor-pointer">
                                <input
                                    type="file"
                                    className="hidden"
                                    ref={inputImage}
                                    onChange={addImge}
                                />
                              {!comment&&   <div className="text-blue-700 flex items-center ps-2">
                                    <FaImage />
                                    <h2>Upload your img</h2>
                                </div>}
                            </label>

                            <button
                                className="p-2 rounded-2xl m-2 text-white bg-blue-500"
                                onClick={comment?editComment:editPost}
                                type="button"
                            >
                                Post
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </>
    );
}
