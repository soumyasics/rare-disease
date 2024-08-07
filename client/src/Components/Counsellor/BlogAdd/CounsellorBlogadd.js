import React, { useState } from 'react';
import "./CounsellorBlogadd.css";
import axiosInstance from '../../Constants/Baseurl';
import { toast } from 'react-toastify';

function CounsellorBlogadd() {
    const id = localStorage.getItem("counsellorlogin");
    const today = new Date().toISOString().split("T")[0];

    const initialState = {
        title: "",
        author: "",
        content: "",
        category: "",
        date: today,
        image: "",
        counsellorId: id
    };

    const [data, setData] = useState(initialState);

    const handlechange = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setData({
            ...data,
            [name]: files[0]
        });
    };

    const handlesubmit = (a) => {
        a.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('author', data.author);
        formData.append('content', data.content);
        formData.append('category', data.category);
        formData.append('date', data.date);
        formData.append('image', data.image);
        formData.append('counsellorId', data.counsellorId);

        axiosInstance.post(`uploadblog`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        .then((result) => {
            console.log(result);
            if (result.data.status === 200) {
                toast.success("Blog Added Successfully");
                setData(initialState); // Reset state after successful submission
            } else {
                toast.error("Cannot add at this moment");
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return (
        <div className='col-9 '>
            <div className='add-blog-container container'>
                <div className='add-blog-head'><p>Add Blog</p></div>
                <form onSubmit={handlesubmit}>
                    <div className='row add-blog-content-main'>
                        <div className='col-4'>
                            <p>Title</p>
                        </div>
                        <div className='col-8'>
                            <input type='text'
                                required
                                name='title'
                                value={data.title}
                                onChange={handlechange}
                            />
                        </div>
                        <div className='col-4'>
                            <p>Author</p>
                        </div>
                        <div className='col-8'>
                            <input type='text'
                                required
                                name='author'
                                value={data.author}
                                onChange={handlechange}
                            />
                        </div>
                        <div className='col-4'>
                            <p>Content</p>
                        </div>
                        <div className='col-8'>
                            <textarea type='text'
                                required
                                name='content'
                                value={data.content}
                                onChange={handlechange}
                            />
                        </div>
                        <div className='col-4'>
                            <p>Category</p>
                        </div>
                        <div className='col-8'>
                            <input type='text'
                                name='category'
                                value={data.category}
                                onChange={handlechange}
                                required
                            />
                        </div>
                        <div className='col-4'>
                            <p>Date</p>
                        </div>
                        <div className='col-8'>
                            <input type='date'
                                name='date'
                                value={data.date}
                                onChange={handlechange}
                                min={today}
                                required
                                readOnly
                            />
                        </div>
                        <div className='col-4'>
                            <p>Choose File</p>
                        </div>
                        <div className='col-8'>
                            <input type='file'
                                name='image'
                                onChange={handleFileChange}
                                required
                            />
                        </div>
                        <div className='col-4'>
                        </div>
                        <div className='col-8'>
                            <button type='submit'>Upload</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CounsellorBlogadd;
