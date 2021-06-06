import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";

import "../styles/AdminRoles.scss";
import Header from "components/Header";
import Wrapper from "components/Wrapper";
import CustomModal from "./CustomModal";
import RoleModel from "models/RoleEto";
import Permission from "models/Permission";
import SimpleLoader from "./SimpleLoader";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "contexts/AuthContext";
import {
  canAddRole,
  canGetRoles,
  canRemoveRole,
  canEditRole,
} from "permissions";
import AccessDenied from "./AccessDenied";
import {
  fetchPermissions,
  fetchRoles,
  addRole,
  removeRole,
  editRole,
} from "services/roleService";
import Role from "./Role";
import RoleForm from "./RoleForm";

export default function AdminRoles() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<RoleModel[]>([]);
  const [edittingRole, setEdittingRole] = useState<RoleModel | null>(null);
  const [isRoleModalOpen, setRoleModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { authUser } = useAuth();

  const _canRemoveRole: boolean = canRemoveRole(authUser);
  const _canGetRoles: boolean = canGetRoles(authUser);
  const _canAddRole: boolean = canAddRole(authUser);
  const _canEditRole: boolean = canEditRole(authUser);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const { err: fetchedPermissionsErr, permissions: fetchedPermissions } =
      await fetchPermissions();
    const { err: fetchedRolesErr, roles: fetchedRoles } = await fetchRoles();

    if (fetchedPermissionsErr || fetchedRolesErr) {
      setError(`${fetchedPermissionsErr} \n ${fetchedRolesErr}`);
    } else {
      setPermissions(fetchedPermissions);
      setRoles(fetchedRoles);
    }
    setLoading(false);
  };

  const handleAddRole = async (newRole) => {
    const { err } = await addRole(newRole);

    await handleErrorAndRefesh(err);
  };

  const handleRemoveRole = async (roleId: string) => {
    const { err } = await removeRole(roleId);

    await handleErrorAndRefesh(err);
  };

  const handleEditRole = async (role) => {
    const { err } = await editRole(role);

    await handleErrorAndRefesh(err);
  };

  const openRoleForm = (role: RoleModel) => {
    setEdittingRole(role);
    setRoleModalOpen(true);
  };

  const handleErrorAndRefesh = async (err: string) => {
    if (err) {
      setError(err);
    } else {
      setError(null);
    }

    await fetch();
  };

  const closeModal = () => {
    setEdittingRole(null);
    setRoleModalOpen(false);
  };

  const handleSubmit = async (role) => {
    if (edittingRole) {
      handleEditRole(role);
    } else {
      handleAddRole(role);
    }

    closeModal();
  };

  return (
    <div className="AdminRoles">
      <Header title="Admin roles" />
      <Wrapper className="content small-padding">
        {_canGetRoles ? (
          <>
            <div className="top">
              <h2>Admin roles</h2>
              {_canAddRole && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setRoleModalOpen(true)}
                >
                  Add new role
                </Button>
              )}
            </div>
            <ErrorMessage error={error} />
            {loading ? (
              <SimpleLoader />
            ) : (
              diaplayRoles({
                roles,
                onRemove: _canRemoveRole ? handleRemoveRole : null,
                onEdit: _canEditRole ? openRoleForm : null,
              })
            )}
          </>
        ) : (
          <AccessDenied />
        )}
        <CustomModal isOpen={isRoleModalOpen} closeModal={closeModal}>
          <RoleForm
            role={edittingRole}
            permissions={permissions}
            submit={handleSubmit}
          />
        </CustomModal>
      </Wrapper>
    </div>
  );
}

const diaplayRoles = ({ roles, onRemove, onEdit }) =>
  roles.length < 1 ? (
    <p>There is no roles</p>
  ) : (
    roles.map((role) => (
      <Role key={role.id} role={role} onRemove={onRemove} onEdit={onEdit} />
    ))
  );
