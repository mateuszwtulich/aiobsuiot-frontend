import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';

import '../styles/AdminUsers.scss';
import User from 'components/User';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import roles from 'consts/roles';
import UserModel from 'models/User';
import CustomModal from './CustomModal';
import UserForm from './UserForm';
import { fetchUsers, addUser, removeUser} from 'services/userService'

const { USER_ROLE, MANAGER_ROLE, ADMIN_ROLE } = roles;

export default function AdminUsers() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUserkModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [edittingUser, setEdittingUser] = useState<UserModel | null>(null);

	useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const { err, users: fetchedUsers } = await fetchUsers();
    
    if (err) {
      setError(err);
    } else {
      setUsers(fetchedUsers);
    }
    setLoading(false);
  };
  

  const closeModal = () => {
    setEdittingUser(null);
    setUserModalOpen(false);
  };

  const handleUserSubmit = (newUser) => {
    if (edittingUser) {
      const newUsers = users.map((user) => (user.id === edittingUser.id ? { ...user, ...newUser } : user));
      setUsers(newUsers);
    } else {
      addUser(newUser)
      setUsers([...users, { id: Math.random() * 100, ...newUser }]);
    }
    closeModal();
  };

  const handleUserRemove = async (userId : string) => {
    const {err} = await removeUser(userId);

		if(err) {
			setError(err);
		} else {
			setError(null);
		}
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
            sumbit={handleUserSubmit}
          />
        </CustomModal>
      </Wrapper>
    </div>
  );
}
