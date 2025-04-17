import React from 'react'
import { Route, Routes } from 'react-router-dom';
import PostList from '../components/PostList/PostList';
import AddFormPost from '../components/AddPost/AddPost'
import PostDetail from '../components/PostDetails/PostDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdatePost from '../components/UpdatePost/UpdatePost';

const AppRoutes = () => {
    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />

            <Routes>
                <Route path="/" element={<PostList />} />
                <Route path="/addPost" element={<AddFormPost />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/post/edit/:id" element={<UpdatePost />} />
            </Routes>
        </div>
    )
}

export default AppRoutes