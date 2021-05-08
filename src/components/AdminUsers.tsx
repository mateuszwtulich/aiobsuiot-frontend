import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import '../styles/AdminUsers.scss';
import User from 'components/User';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import roles from 'consts/roles';
import UserModel from 'models/User';
import CustomModal from './CustomModal';
import UserForm from './UserForm';

const { USER_ROLE, MANAGER_ROLE, ADMIN_ROLE } = roles;

const initialUsers : UserModel[] = [
  {
    id: '1', name: 'Jan', surname: 'Kowalski', role: USER_ROLE,
  },
  {
    id: '2', name: 'Kamil', surname: 'Nowak', role: USER_ROLE,
  },
  {
    id: '3', name: 'Janusz', surname: 'Fraś', role: MANAGER_ROLE,
  },
  {
    id: '4', name: 'Mariusz', surname: 'Sobecki', role: ADMIN_ROLE,
  }];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [isUserkModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [edittingUser, setEdittingUser] = useState<UserModel | null>(null);

  const closeModal = () => {
    setEdittingUser(null);
    setUserModalOpen(false);
  };

  const handleUserAdd = (newUser) => {
    setUsers([...users, { id: Math.random() * 100, ...newUser }]);
    closeModal();
  };

  const handleUserRemove = (userId) => {
    setUsers(users.filter(({ id }) => id !== userId));
  };

  const handleUserEdit = (userId) => {
    setEdittingUser(users.find(({ id }) => id === userId) ?? null);
    setUserModalOpen(true);
  };

  return (
    <div className="AdminUsers">
      <Header title="Admin users" />
      <Wrapper className="content small-padding">
        <div className="top">
          <h2>Manage users</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setUserModalOpen(true)}
          >
            Add new user
          </Button>
        </div>
        {users.map(((user) => (
          <User
            key={user.id}
            user={user}
            onUserRemove={handleUserRemove}
            onUserEdit={handleUserEdit}
          />
        )))}
        <CustomModal
          isOpen={isUserkModalOpen}
          closeModal={closeModal}
        >
          <UserForm
            user={edittingUser}
            sumbit={handleUserAdd}
          />
        </CustomModal>
      </Wrapper>
    </div>
  );
}
