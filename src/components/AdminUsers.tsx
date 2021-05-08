import React, { useState } from 'react';

import '../styles/AdminUsers.scss';
import User from 'components/User';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import roles from 'consts/roles';

type UserType = {id: string, name: string, surname: string, role: string}

const { USER_ROLE, MANAGER_ROLE, ADMIN_ROLE } = roles;

const initialUsers : UserType[] = [
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

  const handleUserRemove = (userId) => {
    setUsers(users.filter(({ id }) => id !== userId));
  };

  return (
    <div className="AdminUsers">
      <Header title="Admin users" />
      <Wrapper className="content small-padding">
        <h2>Manage users</h2>
        {users.map(((user) => (
          <User
            key={user.id}
            user={user}
            onUserRemove={handleUserRemove}
          />
        )))}
      </Wrapper>
    </div>
  );
}
