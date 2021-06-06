import axios from "axios";
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
    console.log(err);
    return { err, roles: [] };
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
    console.log(err);
    return { err, roles: [] };
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
    console.log(err);
    return { err, roles: [] };
  }
}

export async function addRole(role: RoleEto) {
  const token = getToken();

  console.log(role);

  try {
    const res = await axios({
      method: "post",
      url: "/user/v1/role",
      headers: { Authorization: `Bearer ${token}` },
      data: role,
    });

    return { err: null, role: res.data };
  } catch (err) {
    console.log(err);
    return { err, role: null };
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
    console.log(err);
    return { err, role: null };
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
    console.log(err);
    return { err };
  }
}
