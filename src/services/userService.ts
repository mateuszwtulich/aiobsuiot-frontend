import axios from "axios";
import User from "models/User";
import { Enums } from "utils/enums";
import { getToken } from "./authService";

export async function fetchUsers() {
  const token = getToken();
  try {
    const res = await axios({
      method: "get",
      url: "/user/v1/users",
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, users: [] };
    }

    return { err: null, users: res.data };
  } catch (err) {
    return { err: err.message, users: [] };
  }
}

export async function fetchUser(userId: string) {
  const token = getToken();
  try {
    const res = await axios({
      method: "get",
      url: `/user/v1/users/${userId}`,
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, users: [] };
    }

    return { err: null, users: res.data };
  } catch (err) {
    return { err: err.message, users: [] };
  }
}

export async function fetchUserRoles(userId: string) {
  const token = getToken();
  try {
    const res = await axios({
      method: "get",
      url: `/user/v1/users/role/${userId}`,
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, users: [] };
    }

    return { err: null, users: res.data };
  } catch (err) {
    return { err: err.message, users: [] };
  }
}

export async function addUser(user: User) {
  const { email, password, name, surname, roleId } = user;

  const token = getToken();
  try {
    const res = await axios({
      method: "post",
      url: "/user/v1/user",
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        accountTo: {
          email: email,
          password: password,
        },
        name: name,
        roleId: roleId,
        surname: surname,
      },
    });
    return { err: null, user: res.data };
  } catch (err) {
    return { err: err.message, user: [] };
  }
}

export async function editUser(user: User) {
  const { email, password, name, surname, roleId } = user;

  const token = getToken();
  try {
    const res = await axios({
      method: "put",
      url: `/user/v1/user/${user.id}`,
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        accountTo: {
          email: email,
          password: password,
        },
        name: name,
        roleId: roleId,
        surname: surname,
      },
    });
    return { err: null, user: res.data };
  } catch (err) {
    return { err: err.message, user: [] };
  }
}

export async function removeUser(userId: string) {
  const token = getToken();
  try {
    await axios({
      method: "delete",
      url: `/user/v1/user/${userId}`,
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
    });

    return { err: null };
  } catch (err) {
    return { err };
  }
}
