import { useState } from 'react';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from './particlebackground'; // ✅ Import it
import './postcreate.css'; // Optional: for additional styling

function PostCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    if (formData.image) data.append('image', formData.image);

    try {
      await api.post('posts/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Post creation failed:', err);
    }
  };

  return (
    <div className="create-container">
      <ParticleBackground /> {/* ✅ Add this line */}
      <div className="create-form-box">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
}

export default PostCreate;
