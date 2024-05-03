import React, { useEffect, useState } from 'react';
import './Components/style.css';
import Meal from './Components/Meal';
import Recipe from './Components/Recipe';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import './scss/style.scss'
import Register from './pages/Register';

function App() {

  return (
    <>
      <Toaster
        position="top-center"
        gutter={8}
        containerStyle={{ margin: "12px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
          style: {
            fontSize: "16px",
            padding: "16px 24px",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Meal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route exact path="/:recipeId" element={<Recipe />} />
      </Routes>
    </>
  )
}

export default App;