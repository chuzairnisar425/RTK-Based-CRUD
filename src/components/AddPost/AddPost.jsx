import React, { useState } from 'react';
import { useAddPostMutation } from '../../App/service/PostApi';

const AddPost = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [addPost, { isLoading }] = useAddPostMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !body) return;

        try {
            await addPost({ title, body, userId: 1 }).unwrap();
            alert('Post added successfully!');
            setTitle('');
            setBody('');
        } catch (err) {
            console.error('Failed to add post:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Add New Post</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 mb-3 rounded"
                required
            />

            <textarea
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border px-3 py-2 mb-3 rounded"
                required
            ></textarea>
            <button
                type="submit"
                className="w-full bg-green-500 cursor-pointer  text-white py-2 rounded hover:bg-green-700 transition"
                disabled={isLoading}
            >
                {isLoading ? 'Adding...' : 'Add Post'}
            </button>
        </form>
    );
};

export default AddPost;
