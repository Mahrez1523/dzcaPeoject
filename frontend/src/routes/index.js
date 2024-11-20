// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Accueil from '../pages/Accueil/Accueil';
import Home from '../pages/home/Home';
import SignIn from '../pages/SignIN/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Profile from '../pages/profile/Profile';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
};

export default AppRoutes;

