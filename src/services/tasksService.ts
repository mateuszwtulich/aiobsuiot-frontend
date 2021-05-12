import axios from 'axios';
import { getToken } from './authService';

export async function fetchTasks() {
  const token = getToken();
  try {
    const res = await axios({
      method: 'get',
      url: 'task/v1/tasks',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);

    if (res.status === 204) {
      return { err: null, tasks: [] };
    }
    return { err: null, tasks: [] };
  } catch (err) {
    console.log(err);
    return { err, tasks: [] };
  }
}

export async function addTask(task) {
  const token = getToken();
  try {
    const res = await axios({
      method: 'get',
      url: 'task/v1/task',
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
    return { err: null, tasks: [] };
  } catch (err) {
    console.log(err);
    return { err, tasks: [] };
  }
}
