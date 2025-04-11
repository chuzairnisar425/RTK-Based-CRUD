import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';

const PostDetailModal = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-gradient-to-br from-white via-gray-100 to-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fadeIn">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-2xl transition-transform hover:scale-110 cursor-pointer"
                    title="Close"
                >
                    <FaTimesCircle />
                </button>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-4 border-b pb-2">
                    {post.title}
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed tracking-wide">
                    {post.body}
                </p>
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-full bg-red-100 text-red-600 font-medium hover:bg-red-200 transition-all duration-200 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostDetailModal;
