import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import './postlist.css';
import ParticleBackground from './particlebackground';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [commentText, setCommentText] = useState({});
  const [refresh, setRefresh] = useState(false);

  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('is_superuser') === 'true';
  const navigate = useNavigate();

  useEffect(() => {
    api.get('posts/')
      .then(res => setPosts(res.data))
      .catch(err => {
        console.error(err);
        setError('Could not fetch posts');
      });
  }, [refresh]);

  const handleCommentChange = (postId, text) => {
    setCommentText(prev => ({ ...prev, [postId]: text }));
  };

  const handleCommentSubmit = (postId) => {
    api.post(`posts/${postId}/comments/`, {
      post: postId,
      content: commentText[postId],
    })
    .then(() => {
      setCommentText(prev => ({ ...prev, [postId]: '' }));
      setRefresh(prev => !prev);
    })
    .catch(err => {
      console.error(err);
    });
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`posts/${postId}/`);
      setRefresh(prev => !prev);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <>
      <ParticleBackground />
      <div className="container">
        <h2 className="heading">Published Posts</h2>

        {isAdmin && (
          <div className="mb-4 text-right">
            <button
              className="bg-green-600 text-white py-2 px-4 rounded"
              onClick={() => navigate('/create')}
            >
              + Create Post
            </button>
          </div>
        )}

        {error && <p className="error">{error}</p>}

        {posts.length === 0 ? (
          <p>No posts found</p>
        ) : (
          <ul className="post-list">
            {posts.map(post => (
              <li key={post.id} className="post-item">
              <p className="post-date text-sm text-gray-500 mb-1">
    Posted on {new Date(post.created_at).toLocaleDateString()}
  </p>    
                <h3>{post.title}</h3>
                {post.image && (
                  <img
                    src={
                      post.image.startsWith('http')
                        ? post.image
                        : `http://localhost:8000${
                            post.image.startsWith('/') ? '' : '/media/'
                          }${post.image}`
                    }
                    alt="Post"
                    className="post-image"
                  />
                )}
                <p>{post.content}</p>

                {isAdmin && (
                  <div className="mt-2 space-x-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                      onClick={() => navigate(`/edit/${post.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

                <h4 className="mt-4 font-semibold">Comments:</h4>
                <ul className="mb-2 pl-4 list-disc">
                  {post.comments?.length > 0 ? (
                    post.comments.map(comment => (
                      <li key={comment.id}>
                        <strong>{comment.author || 'Anonymous'}:</strong> {comment.content}
                      </li>
                    ))
                  ) : (
                    <li>No comments yet</li>
                  )}
                </ul>

                {token && (
                  <div className="comment-form mt-2">
                    <input
                      type="text"
                      value={commentText[post.id] || ''}
                      onChange={(e) => handleCommentChange(post.id, e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-2 border rounded mb-2"
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id)}
                      className="bg-blue-600 text-white py-1 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default PostList;