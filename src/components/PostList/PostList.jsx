import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaEdit } from 'react-icons/fa';
import { useDeletePostMutation, useGetPostsQuery } from '../../App/service/PostApi';
import UpdatePost from '../UpdatePost/UpdatePost';

const PostList = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  const [editPost, setEditPost] = useState(null);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (!posts)
    return <p className="text-center mt-10 text-red-500">No posts found.</p>;

  const sortedPosts = [...posts].reverse();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-center text-green-600 tracking-wide">
        📬 All Posts
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              <span className="block text-sm font-medium text-gray-400">Title:</span>
              {post.title}
            </h3>

            {/* Delete button */}
            <button
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
              onClick={(e) => {
                e.stopPropagation();
                deletePost(post.id);
              }}
              title="Delete"
            >
              <FaTimesCircle size={18} />
            </button>

            {/* Edit button */}
            <button
              className="absolute top-3 right-10 text-blue-500 hover:text-blue-700 transition"
              onClick={() => navigate(`/post/edit/${post.id}`)}
              title="Edit"
            >
              <FaEdit size={18} />
            </button>

            <div className="mt-6">
              <p
                className="inline-block text-sm font-medium text-blue-600 hover:underline cursor-pointer"
                onClick={() => navigate(`/post/${post.id}`)}
              >
                View Body Details →
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default PostList;
