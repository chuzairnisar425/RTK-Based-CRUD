import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useDeletePostMutation, useGetPostsQuery } from '../../App/service/postApi';
import { setSelectedPost } from '../../App/slice/PostSlice';
import PostDetailModal from '../PostDetails/PostDetailModal';
import { FaTimesCircle } from 'react-icons/fa';

const PostList = () => {
  const { data: posts, isLoading } = useGetPostsQuery();
  const [selectedPost, setSelectedPostLocal] = useState(null);
  const [deletePost] = useDeletePostMutation();
  const dispatch = useDispatch();

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  if (!posts)
    return <p className="text-center mt-10 text-red-500">No posts found.</p>;

  const sortedPosts = [...posts].reverse();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-500">All Posts</h2>

      <div className="items-center justify-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 p-6 rounded-lg relative"
          >
            <h3 className="font-semibold text-lg mb-4 text-black">
              <span className="text-base text-gray-500">Title:</span> {post.title}
            </h3>

            <button
              className="cursor-pointer absolute top-2 right-2 text-red-500 hover:text-red-700 transition duration-200"
              onClick={(e) => {
                e.stopPropagation();
                deletePost(post.id);
              }}
              title="Delete"
            >
              <FaTimesCircle />
            </button>
            <p
              className="text-sm text-blue-600 mt-2 cursor-pointer"
              onClick={() => {
                dispatch(setSelectedPost(post));
                setSelectedPostLocal(post);
              }}
            >
              View Body Details
            </p>
          </div>
        ))}
      </div>

      <PostDetailModal post={selectedPost} onClose={() => setSelectedPostLocal(null)} />


    </div>
  );
};

export default PostList;
