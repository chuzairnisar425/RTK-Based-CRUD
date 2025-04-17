import React, { useState } from 'react';
import { useAddPostMutation } from '../../App/service/PostApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [addPost, { isLoading }] = useAddPostMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !body) {
            toast.error("Please fill in both fields.");
            return;
        }

        try {
            await addPost({ title, body, userId: 1 }).unwrap();
            toast.success('Post added successfully!');
            navigate('/');
            setTitle('');
            setBody('');
        } catch (err) {
            toast.error('Failed to add post:', err.message || 'Unknown error');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto mt-10 bg-white border border-gray-200 shadow-xl rounded-2xl p-8 space-y-6"
        >
            <h2 className="text-3xl font-extrabold text-center text-green-600 mb-6 tracking-wide">
                Add a New Post
            </h2>

            {/* Title Input */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    placeholder="Enter your post title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none px-4 py-2 rounded-lg text-gray-800 transition-all duration-300 ease-in-out"
                    required
                />
            </div>

            {/* Body Textarea */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Body</label>
                <textarea
                    placeholder="Write the body of your post..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none px-4 py-2 rounded-lg text-gray-800 transition-all duration-300 ease-in-out min-h-[150px]"
                    required
                />
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2.5 rounded-lg hover:bg-green-600 transition duration-300 disabled:opacity-70"
                disabled={isLoading}
            >
                {isLoading ? (
                    <ClipLoader size={20} color="#fff" />
                ) : (
                    'Add Post'
                )}
            </button>
        </form>
    );
};

export default AddPost;
