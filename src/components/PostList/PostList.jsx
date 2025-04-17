import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useDeletePostMutation, useGetPostsQuery } from '../../App/service/PostApi';
import { ClipLoader } from 'react-spinners';

const PostList = () => {
  const { data: allPosts, isLoading } = useGetPostsQuery();
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 8;
  const observerRef = useRef(null);
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Initial load
  useEffect(() => {
    if (allPosts?.length) {
      const initialPosts = [...allPosts].reverse().slice(0, postsPerPage);
      setVisiblePosts(initialPosts);
    }
  }, [allPosts]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isFetchingMore && visiblePosts.length < allPosts?.length) {
        setIsFetchingMore(true);
        setTimeout(() => {
          setPage((prevPage) => prevPage + 1);
        }, 300);
      }
    }, { threshold: 1 });

    const target = observerRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [isFetchingMore, visiblePosts.length, allPosts?.length]);

  // Load more posts when page increases
  useEffect(() => {
    if (allPosts?.length && page > 1) {
      const start = (page - 1) * postsPerPage;
      const end = page * postsPerPage;
      const morePosts = allPosts.slice(start, end);
      setVisiblePosts((prev) => [...prev, ...morePosts]);
      setIsFetchingMore(false);
    }
  }, [page, allPosts]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-16">
        <ClipLoader size={35} color="#10B981" />
      </div>
    );
  }

  if (!allPosts || !allPosts.length) {
    return <p className="text-center mt-10 text-red-500">No posts found.</p>;
  }

  return (
    <div className="p-6 md:p-10 bg-gradient-to-b from-gray-50 via-white to-gray-100 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-12 text-center text-green-600 tracking-wide drop-shadow-sm">
        📌 All Posts <span className="text-gray-500 text-lg">(Infinite Scroll)</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            className="relative bg-white border border-gray-200 rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 animate-fadeIn"
          >
            <img
              src={`https://picsum.photos/200/300?random=${post.id}`}
              alt="Post"
              loading="lazy"
              className="w-full h-40 object-cover rounded-lg mb-4 transition-opacity duration-500 opacity-0"
              onLoad={(e) => {
                e.currentTarget.classList.add("opacity-100");
              }}
            />

            <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
              {post.title}
            </h3>

            <div className="absolute top-4 right-4 flex space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deletePost(post.id);
                }}
                className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full shadow-md transition"
                title="Delete"
              >
                <FaTrash size={16} />
              </button>

              <button
                onClick={() => navigate(`/post/edit/${post.id}`)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 p-2 rounded-full shadow-md transition"
                title="Edit"
              >
                <FaEdit size={16} />
              </button>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => navigate(`/post/${post.id}`)}
                className="text-sm font-medium text-green-600 hover:underline hover:text-green-700 transition-all"
              >
                View Full Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite scroll loader */}
      <div ref={observerRef} className="h-16 flex justify-center items-center mt-10">
        {visiblePosts.length < allPosts.length ? (
          <ClipLoader size={30} color="#10B981" />
        ) : (
          <p className="text-gray-400 text-sm italic">🎉 You’ve reached the end!</p>
        )}
      </div>

      {/* Add Post Button */}
      <button
        onClick={() => navigate('/addPost')}
        className="fixed bottom-8 right-8 bg-green-600 text-white rounded-full p-4 shadow-lg hover:bg-green-700 transition-all"
        title="Add New Post"
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
};

export default PostList;
