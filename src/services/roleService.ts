import axios from "axios";
import { ROLE_TO_REMOVE_HAS_USER_ASSIGNED } from "consts/errors";
import RoleEto from "models/RoleEto";
import { getToken } from "./authService";

export async function fetchPermissions() {
  const token = getToken();
  try {
    const res = await axios({
      method: "get",
      url: "/user/v1/permissions",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, permissions: [] };
    }

    return { err: null, permissions: res.data };
  } catch (err) {
    return { err: err.message, roles: [] };
  }
}

export async function fetchRole(roleId: string) {
  const token = getToken();
  try {
    const res = await axios({
      method: "get",
      url: `/user/v1/roles/${roleId}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, role: null };
    }

    return { err: null, roles: res.data };
  } catch (err) {
    return { err: err.message, roles: [] };
  }
}

export async function fetchRoles() {
  const token = getToken();
  try {
    const res = await axios({
      method: "get",
      url: `/user/v1/roles/`,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 204) {
      return { err: null, roles: [] };
    }

    return { err: null, roles: res.data };
  } catch (err) {
    return { err: err.message, roles: [] };
  }
}

export async function addRole(role: RoleEto) {
  const token = getToken();

  try {
    const res = await axios({
      method: "post",
      url: "/user/v1/role",
      headers: { Authorization: `Bearer ${token}` },
      data: role,
    });

    return { err: null, role: res.data };
  } catch (err) {
    return { err: err.message, role: null };
  }
}

export async function editRole(role: RoleEto) {
  const token = getToken();

  try {
    const res = await axios({
      method: "put",
      url: `/user/v1/role/${role.id}`,
      headers: { Authorization: `Bearer ${token}` },
      data: role,
    });

    return { err: null, role: res.data };
  } catch (err) {
    return { err: err.message, role: null };
  }
}

export async function removeRole(roleId: string) {
  const token = getToken();
  try {
    await axios({
      method: "delete",
      url: `/user/v1/role/${roleId}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { err: null };
  } catch (err) {
    if (err.response.status === 422) {
      return { err: ROLE_TO_REMOVE_HAS_USER_ASSIGNED, role: null };
    }

    return { err: err.message };
  }
}
