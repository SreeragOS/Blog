import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Auth/signup';
import Login from './components/Auth/Login';
import PostList from './components/Posts/postlist';
import PostCreate from './components/Posts/postcreate';
import PostEdit from './components/Posts/postedit'; // ← ✅ Import edit component
import Navbar from './components/layout/navbar';
import AdminRoute from './components/Auth/adminroute'; // ← ✅ Guard for admin-only routes

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4">
      <div className="w-full max-w-3xl py-8">
        <Navbar />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PostList />} />
          <Route
            path="/create"
            element={
              <AdminRoute>
                <PostCreate />
              </AdminRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <AdminRoute>
                <PostEdit />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
