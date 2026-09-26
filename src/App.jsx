import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import AppLayout from './components/layout/AppLayout';
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages publiques : sans navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Pages avec navbar */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Accueil />} />
        </Route>
      </Routes>

      <Toaster position="top-right" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;
