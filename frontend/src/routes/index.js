import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Pas besoin d'importer BrowserRouter ici
import Accueil from '../pages/Accueil/Accueil';
import Home from '../pages/home/Home';
import SignIn from '../pages/SignIN/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import Profile from '../pages/profile/Profile';
import PrivateRouter from './privateRouter';

const AppRoutes = () => {
    return (
        <Routes>
            {/* Route publique */}
            <Route path="/" element={<Accueil />} />
            <Route path="/signin" element={<SignIn />} />
    
            {/* Routes privées */}
            <Route
              path="/home"
              element={
                <PrivateRouter>
                  <Home />
                </PrivateRouter>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRouter>
                  <Profile />
                </PrivateRouter>
              }
            />
            <Route
              path="/signup"
              element={
                <PrivateRouter>
                  <SignUp />
                </PrivateRouter>
              }
            />
        </Routes>
    );
};

export default AppRoutes;
