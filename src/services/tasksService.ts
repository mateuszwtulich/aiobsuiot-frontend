import axios from "axios";
import Task from "models/Task";
import { Enums } from "utils/enums";
import { getToken } from "./authService";

export async function fetchTasks() {
  const token = getToken();
  try {
    const res = await axios({
      method: "get",
      url: "/task/v1/tasks",
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, tasks: [] };
    }

    return { err: null, tasks: res.data };
  } catch (err) {
    return { err: err.message, tasks: [] };
  }
}

export async function fetchTask(taskId: string) {
  const token = getToken();
  try {
    const res = await axios({
      method: "get",
      url: `/task/v1/tasks/${taskId}`,
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 204) {
      return { err: null, tasks: null };
    }

    return { err: null, tasks: res.data };
  } catch (err) {
    return { err: err.message, tasks: [] };
  }
}

export async function fetchUserTasks(userId) {
  const token = getToken();
  try {
    const res = await axios({
      method: "get",
      url: `/task/v1/tasks/user/${userId}`,
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 204) {
      return { err: null, tasks: [] };
    }

    return { err: null, tasks: res.data };
  } catch (err) {
    return { err: err.message, tasks: [] };
  }
}

export async function addTask({
  task,
  userId,
}: {
  task: Task;
  userId: string;
}) {
  const token = getToken();
  const { finalDate, name } = task;

  try {
    const res = await axios({
      method: "post",
      url: "/task/v1/task",
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        finalDate: finalDate,
        name,
        userId: userId,
      },
    });

    return { err: null, task: res.data };
  } catch (err) {
    return { err: err.message, task: null };
  }
}

export async function editTask({
  task,
  userId,
}: {
  task: Task;
  userId: string;
}) {
  const token = getToken();
  const { finalDate, name } = task;

  try {
    const res = await axios({
      method: "put",
      url: `/task/v1/task/${task.id}`,
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        finalDate: finalDate,
        name,
        userId: userId,
      },
    });

    return { err: null, task: res.data };
  } catch (err) {
    return { err: err.message, task: null };
  }
}

export async function removeTask(taskId: string) {
  const token = getToken();
  try {
    await axios({
      method: "delete",
      url: `/task/v1/task/${taskId}`,
      baseURL: Enums.API,
      headers: { Authorization: `Bearer ${token}` },
    });
    return { err: null };
  } catch (err) {
    return { err: err.message };
  }
}
