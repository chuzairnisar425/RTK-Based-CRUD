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
        <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gray-50">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium transition"
            >
                <FaArrowLeft className="mr-2" /> Back to Posts
            </button>

            <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-8 transition-all">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 leading-tight tracking-tight">
                    {post.title}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.body}
                </p>
            </div>
        </div>

    );
};

export default PostDetail;
