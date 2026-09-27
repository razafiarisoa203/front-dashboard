import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import AppLayout from './components/layout/AppLayout';
import Accueil from './pages/Accueil';
import Login from './pages/Login';
import Register from './pages/Register';
import TableauDeBord from './pages/TableauDeBord';
import AccesRefuse from './pages/AccesRefuse';
import Navbaradmin from './roles/admin/Navbaradmin';
import Sidebaradmin from './roles/admin/Sidebaradmin';
import HeaderDashboard from './roles/admin/HeaderDashboard';
import Carteadmin from './roles/admin/Carteadmin';
import Profile from './roles/admin/Profile';
import Utilisateur from './roles/admin/Utilisateur';
import Permission from './roles/admin/Permission';
import UtilisateurPartie from './roles/utilisateur/Utilisateur';

const AdminSectionPage = ({ title, description }) => (
  <div className="flex min-h-screen bg-slate-100 text-slate-800">
    <Sidebaradmin />

    <div className="flex-1">
      <Navbaradmin />

      <main className="p-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
            Administration
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">{title}</h1>
          <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
        </div>
      </main>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Pages publiques : sans navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/acces-refuse" element={<AccesRefuse />} />

          {/* Espace authentifie : la garde verifie session puis permission */}
          <Route element={<ProtectedRoute permission="dashboard.view" />}>
            <Route element={<AppLayout />}>
              <Route path="/tableau-de-bord" element={<TableauDeBord />} />
            </Route>
          </Route>

          {/* Pages avec navbar */}
          <Route element={<AppLayout />}>
            <Route path="/" element={<Accueil />} />
          </Route>

          <Route path="/navbar-admin" element={<Navbaradmin />} />
          <Route path="/sidebar-admin" element={<Sidebaradmin />} />
          <Route path="/header-dashboard" element={<HeaderDashboard />} />
          <Route path="/carte-admin" element={<Carteadmin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/utilisateur" element={<UtilisateurPartie />} />

          <Route path="/utilisateurs" element={<Utilisateur />} />
          <Route path="/permissions" element={<Permission />} />
          <Route
            path="/cartographie"
            element={<AdminSectionPage title="Cartographie" description="Suivi du territoire, couches SIG et données géospatiales." />}
          />
          <Route
            path="/rapports"
            element={<AdminSectionPage title="Rapports" description="Synthèses et exports des performances et des interventions." />}
          />
          <Route
            path="/projets"
            element={<AdminSectionPage title="Projets" description="Suivi des projets en cours, avancement et priorités." />}
          />
          <Route
            path="/parametres"
            element={<AdminSectionPage title="Paramètres" description="Réglages système, sécurité et configuration générale." />}
          />

          {/* Repli */}
          <Route path="*" element={<Accueil />} />
        </Routes>

        <Toaster position="top-right" richColors closeButton />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
