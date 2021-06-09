import React, { useEffect, useState } from "react";
import { Button } from "@material-ui/core";

import "../styles/AdminUsers.scss";
import User from "components/User";
import Header from "components/Header";
import Wrapper from "components/Wrapper";
import UserModel from "models/User";
import RoleModel from "models/RoleEto";
import CustomModal from "./CustomModal";
import UserForm from "./UserForm";
import SimpleLoader from "./SimpleLoader";
import {
  fetchUsers,
  addUser,
  removeUser,
  editUser,
} from "services/userService";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "contexts/AuthContext";
import {
  canAddUser,
  canGetUsers,
  canRemoveUser,
  canEditUser,
} from "permissions";
import AccessDenied from "./AccessDenied";
import InfoDialog from "./InfoDialog";
import { fetchRoles } from "services/roleService";

export default function AdminUsers() {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [roles, setRoles] = useState<RoleModel[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUserkModalOpen, setUserModalOpen] = useState<boolean>(false);
  const [edittingUser, setEdittingUser] = useState<UserModel | null>(null);
  const [isInfoDialogOpened, setInfoDialogOpened] = useState(false);

  const { authUser } = useAuth();

  const _canGetUsers: boolean = canGetUsers(authUser);
  const _canAddUser: boolean = canAddUser(authUser);
  const _canEditUser: boolean = canEditUser(authUser);
  const _canRemoveUser: boolean = canRemoveUser(authUser);

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

    const { err: err1, roles: allRoles } = await fetchRoles();

    if (err1) {
      setError(err1);
    } else {
      setRoles(allRoles);
    }
    setLoading(false);
  };

  const closeModal = () => {
    setEdittingUser(null);
    setUserModalOpen(false);
  };

  const handleErrorAndRefesh = async (err: string) => {
    if (err) {
      setError(err);
    } else {
      setError(null);
    }

    await fetch();
  };

  const handleUserSubmit = async (newUser) => {
    setUserModalOpen(false);
    setLoading(true);

    if (edittingUser) {
      const { err } = await editUser(newUser);
      await handleErrorAndRefesh(err);
    } else {
      const { err } = await addUser(newUser);
      if (!err) {
        handleOpenInfoDialog();
      }
      await handleErrorAndRefesh(err);
    }

    setLoading(false);
  };

  const handleUserRemove = async (userId: string) => {
    const { err } = await removeUser(userId);

    await handleErrorAndRefesh(err);
  };

  const handleUserEdit = (userId) => {
    const user = (users || []).find(({ id }) => id === userId);
    setEdittingUser(user ?? null);
    setUserModalOpen(true);
  };

  const handleOpenInfoDialog = () => {
    setInfoDialogOpened(true);
  };

  const handleCloseInfoDialog = () => {
    setInfoDialogOpened(false);
  };

  return (
    <div className="AdminUsers">
      <Header title="Admin users" />
      <Wrapper className="content small-padding">
        {_canGetUsers ? (
          <>
            <div className="top">
              <h2>Manage users</h2>
              {_canAddUser && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setUserModalOpen(true)}
                >
                  Add new user
                </Button>
              )}
            </div>
            <ErrorMessage error={error} />
            {loading ? (
              <SimpleLoader />
            ) : (
              diaplayUsers({
                users,
                onUserRemove: _canRemoveUser ? handleUserRemove : null,
                onUserEdit: _canEditUser ? handleUserEdit : null,
              })
            )}
          </>
        ) : (
          <AccessDenied />
        )}
        <CustomModal isOpen={isUserkModalOpen} closeModal={closeModal}>
          <UserForm user={edittingUser} submit={handleUserSubmit} roles = {roles} />
        </CustomModal>

        <InfoDialog
          title="Confirm your email"
          text="To finish adding new user please log in to email account and confirm email provided in form"
          isOpen={isInfoDialogOpened}
          closeInfoDialog={handleCloseInfoDialog}
        />
      </Wrapper>
    </div>
  );
}

const diaplayUsers = ({ users, onUserRemove, onUserEdit }) =>
  users.length < 1 ? (
    <p>There is no users</p>
  ) : (
    users.map((user) => (
      <User
        key={user.id}
        user={user}
        onUserRemove={onUserRemove}
        onUserEdit={onUserEdit}
      />
    ))
  );
