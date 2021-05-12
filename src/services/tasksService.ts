import axios from 'axios';
import Task from 'models/Task';
import formatDate from 'utils/formatDate';
import { getToken } from './authService';

export async function fetchTasks() {
  const token = getToken();
  try {
    const res = await axios({
      method: 'get',
      url: 'task/v1/tasks',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 204) {
      return { err: null, tasks: [] };
    }
		
    return { err: null, tasks: res.data };
  } catch (err) {
    console.log(err);
    return { err, tasks: [] };
  }
}

export async function addTask({task, userId}: {task: Task, userId: string}) {
  const token = getToken();
	const {finalDate, name} = task;

  try {
    const res = await axios({
      method: 'post',
      url: 'task/v1/task',
      headers: { Authorization: `Bearer ${token}` },
			data: {
				finalDate: formatDate(finalDate),
				name,
				userId: userId,
			}
    });

		return { err: null, task: res.data }
  } catch (err) {
    console.log(err);
    return { err, task: null };
  }
}

export async function removeTask(taskId: string) {
  const token = getToken();
  try {
    const res = await axios({
      method: 'delete',
      url: `task/v1/task/${taskId}`,
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res);
		return { err: null }
  } catch (err) {
    console.log(err);
    return { err };
  }
}
