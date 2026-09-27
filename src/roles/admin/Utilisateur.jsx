import React, { useMemo, useState } from 'react';
import {
  Edit,
  Trash2,
  ShieldCheck,
  UserCheck,
  UserX,
  Plus,
  X,
} from 'lucide-react';

import Sidebaradmin from './Sidebaradmin';
import Navbaradmin from './Navbaradmin';

const navItems = [
  'Vue d’ensemble',
  'Utilisateurs',
  'Rôles',
  'Historique',
];

const roles = [
  'Administrateur',
  'Gestionnaire',
  'Décideur',
  'Utilisateur',
];

const initialUsers = [
  {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    role: 'Administrateur',
    status: 'Actif',
  },
  {
    id: 2,
    name: 'Marie Martin',
    email: 'marie.martin@example.com',
    role: 'Gestionnaire',
    status: 'Inactif',
  },
];

const emptyForm = {
  name: '',
  email: '',
  role: 'Utilisateur',
  status: 'Actif',
};

export default function Utilisateur() {
  const [users, setUsers] = useState(initialUsers);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('Tous');
  const [statusFilter, setStatusFilter] = useState('Tous');
  const [activeTab, setActiveTab] = useState('Utilisateurs');

  const [modalType, setModalType] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search);

      const matchesRole =
        roleFilter === 'Tous' || user.role === roleFilter;

      const matchesStatus =
        statusFilter === 'Tous' || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const openAddModal = () => {
    setSelectedUser(null);
    setFormData({ ...emptyForm });
    setModalType('form');
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setModalType('form');
  };

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setModalType('role');
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setModalType('delete');
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
    setFormData({ ...emptyForm });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSaveUser = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email) {
      window.alert('Veuillez remplir le nom et l’adresse email.');
      return;
    }

    if (selectedUser) {
      setUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === selectedUser.id
            ? {
                ...user,
                name,
                email,
                role: formData.role,
                status: formData.status,
              }
            : user
        )
      );
    } else {
      const newUser = {
        id: Date.now(),
        name,
        email,
        role: formData.role,
        status: formData.status,
      };
      setUsers((previousUsers) => [...previousUsers, newUser]);
    }

    closeModal();
  };

  const handleAssignRole = (event) => {
    event.preventDefault();
    if (!selectedUser) return;

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === selectedUser.id
          ? { ...user, role: formData.role }
          : user
      )
    );
    closeModal();
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;

    setUsers((previousUsers) =>
      previousUsers.filter((user) => user.id !== selectedUser.id)
    );
    closeModal();
  };

  const toggleUserStatus = (user) => {
    setUsers((previousUsers) =>
      previousUsers.map((currentUser) =>
        currentUser.id === user.id
          ? {
              ...currentUser,
              status: currentUser.status === 'Actif' ? 'Inactif' : 'Actif',
            }
          : currentUser
      )
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <Sidebaradmin />

      <div className="flex flex-1 flex-col">
        <Navbaradmin />

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-900">
              Gestion des utilisateurs
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Gérez les comptes, les rôles et les statuts des utilisateurs.
            </p>
          </div>

          <nav className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveTab(item)}
                className={
                  activeTab === item
                    ? 'rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm'
                    : 'rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900'
                }
              >
                {item}
              </button>
            ))}
          </nav>

          {activeTab !== 'Utilisateurs' ? (
            <section className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
                Menu
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {activeTab}
              </h2>
              <p className="mt-3 text-slate-500">
                Cette section est prête à recevoir le contenu associé à ce
                menu.
              </p>
            </section>
          ) : (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-600">
                    Liste
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-slate-900">
                    Tous les utilisateurs
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    {filteredUsers.length}{' '}
                    {filteredUsers.length === 1
                      ? 'utilisateur'
                      : 'utilisateurs'}
                  </div>

                  <button
                    type="button"
                    onClick={openAddModal}
                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                  >
                    <Plus size={18} />
                    Ajouter
                  </button>
                </div>
              </div>

              <div className="mb-5 grid gap-3 md:grid-cols-3">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Rechercher un utilisateur..."
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

                <select
                  value={roleFilter}
                  onChange={(event) => setRoleFilter(event.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
                >
                  <option value="Tous">Tous les rôles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-500"
                >
                  <option value="Tous">Tous les statuts</option>
                  <option value="Actif">Actifs</option>
                  <option value="Inactif">Inactifs</option>
                </select>
              </div>

              <div className="overflow-visible rounded-2xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Nom
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Email
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Rôle
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Statut
                        </th>
                        <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                          Actions
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredUsers.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-4 py-16 text-center text-sm text-slate-500"
                          >
                            Aucun utilisateur trouvé.
                          </td>
                        </tr>
                      ) : (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50">
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-700">
                                  {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-semibold text-slate-800">
                                  {user.name}
                                </span>
                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm text-slate-600">
                              {user.email}
                            </td>

                            <td className="px-4 py-4">
                              <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                <ShieldCheck size={14} />
                                {user.role}
                              </span>
                            </td>

                            <td className="px-4 py-4">
                              <span
                                className={
                                  user.status === 'Actif'
                                    ? 'rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700'
                                    : 'rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700'
                                }
                              >
                                {user.status}
                              </span>
                            </td>

                            <td className="px-4 py-4">
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={() => openEditModal(user)}
                                  title="Modifier"
                                  className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                                >
                                  <Edit size={18} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openRoleModal(user)}
                                  title="Attribuer un rôle"
                                  className="rounded-lg p-2 text-slate-500 transition hover:bg-emerald-50 hover:text-emerald-600"
                                >
                                  <ShieldCheck size={18} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => toggleUserStatus(user)}
                                  title={
                                    user.status === 'Actif'
                                      ? 'Désactiver le compte'
                                      : 'Activer le compte'
                                  }
                                  className={`rounded-lg p-2 transition ${
                                    user.status === 'Actif'
                                      ? 'text-slate-500 hover:bg-amber-50 hover:text-amber-600'
                                      : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                                  }`}
                                >
                                  {user.status === 'Actif' ? (
                                    <UserX size={18} />
                                  ) : (
                                    <UserCheck size={18} />
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => openDeleteModal(user)}
                                  title="Supprimer"
                                  className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* ===== MODALS ===== */}
      {modalType && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            {modalType === 'form' && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    {selectedUser
                      ? 'Modifier l’utilisateur'
                      : 'Ajouter un utilisateur'}
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    aria-label="Fermer la fenêtre"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSaveUser} className="space-y-4">
                  <div>
                    <label
                      htmlFor="user-name"
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Nom complet
                    </label>
                    <input
                      id="user-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Ex : Jean Dupont"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="user-email"
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Adresse email
                    </label>
                    <input
                      id="user-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="jean@example.com"
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="user-role"
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Rôle
                    </label>
                    <select
                      id="user-role"
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-emerald-500"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="user-status"
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Statut
                    </label>
                    <select
                      id="user-status"
                      name="status"
                      value={formData.status}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-emerald-500"
                    >
                      <option value="Actif">Actif</option>
                      <option value="Inactif">Inactif</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              </>
            )}

            {modalType === 'role' && selectedUser && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    Attribuer un rôle
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    aria-label="Fermer la fenêtre"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="mb-4 text-sm text-slate-600">
                  Sélectionnez le rôle à attribuer à{' '}
                  <strong>{selectedUser.name}</strong>.
                </p>

                <form onSubmit={handleAssignRole} className="space-y-4">
                  <div>
                    <label
                      htmlFor="role-assignment"
                      className="mb-1 block text-sm font-medium text-slate-700"
                    >
                      Rôle
                    </label>
                    <select
                      id="role-assignment"
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-emerald-500"
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                      Attribuer
                    </button>
                  </div>
                </form>
              </>
            )}

            {modalType === 'delete' && selectedUser && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-slate-900">
                    Supprimer l’utilisateur
                  </h2>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    aria-label="Fermer la fenêtre"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-sm leading-6 text-slate-600">
                  Voulez-vous vraiment supprimer l’utilisateur{' '}
                  <strong>{selectedUser.name}</strong> ?
                  <br />
                  Cette action est irréversible.
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteUser}
                    className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}