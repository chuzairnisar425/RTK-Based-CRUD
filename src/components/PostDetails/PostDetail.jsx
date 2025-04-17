// src/pages/PostDetail.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostsQuery } from '../../App/service/PostApi';
import { FaArrowLeft } from 'react-icons/fa';

const PostDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: posts, isLoading, isError } = useGetPostsQuery();

    const post = posts.find((p) => p.id.toString() === id);

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error fetching posts</div>;
    if (!post) return <div className="text-center mt-10 text-xl text-red-500">Post not found!</div>;

    return (
        <div className="bg-gray-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl bg-white mx-auto shadow-lg rounded-3xl overflow-hidden">
                <div className="px-8 py-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center text-white bg-indigo-500 hover:bg-indigo-700 text-sm font-semibold py-2 px-4 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all mb-8"
                    >
                        <FaArrowLeft className="mr-2" /> Back to Posts
                    </button>
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-6 leading-snug tracking-tight">
                        {post.title}
                    </h2>
                    <p className="text-lg text-gray-600 leading-relaxed mb-6">{post.body}</p>

                    <div className="border-t border-gray-200 pt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Posted by <strong>Admin</strong> on {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
