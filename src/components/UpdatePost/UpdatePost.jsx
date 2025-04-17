import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPostsQuery, useUpdatePostMutation } from '../../App/service/PostApi';
import { toast } from 'react-toastify';

const UpdatePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: posts, isLoading: loadingPosts } = useGetPostsQuery();
    const [updatePost, { isLoading }] = useUpdatePostMutation();

    const [title, setTitle] = useState();
    const [body, setBody] = useState('');

    useEffect(() => {
        if (posts) {
            const post = posts.find((p) => p.id === Number(id)); // fix: cast id to number
            if (post) {
                setTitle(post.title);
                setBody(post.body);
            }
        }
    }, [posts, id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updatePost({ id: Number(id), title, body, userId: 1 }).unwrap();
            toast.success('Post updated successfully!');
            navigate('/');
        } catch (error) {
            toast.error('Update failed!');
            console.error(error);
        }
    };

    if (loadingPosts) return <div className="text-center mt-10">Loading post...</div>;

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto mt-10 bg-white border border-gray-200 shadow-lg rounded-2xl p-8 space-y-6"
        >
            <h2 className="text-3xl font-bold text-center text-green-600 tracking-tight">
                Edit Post
            </h2>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title..."
                    className="w-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none px-4 py-2 rounded-lg text-gray-800 transition"
                    required
                />
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Body</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter body..."
                    className="w-full border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none px-4 py-2 rounded-lg text-gray-800 transition min-h-[150px]"
                    required
                ></textarea>
            </div>

            <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2.5 rounded-lg hover:bg-green-600 transition duration-200 disabled:opacity-70"
                disabled={isLoading}
            >
                {isLoading ? 'Updating...' : 'Update Post'}
            </button>
        </form>

    );
};

export default UpdatePost;
