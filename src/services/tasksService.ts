import axios from 'axios';
import Task from 'models/Task';
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
    return { err: null, tasks: [] };
  } catch (err) {
    console.log(err);
    return { err, tasks: [] };
  }
}

export async function addTask({task, userId}: {task: Task, userId: string}) {
  const token = getToken();
	const {finalDate, name} = task;

	console.log(userId);
	console.log(token);
	
	console.log({
		finalDate: finalDate.toISOString(),
		name,
		userId: userId,
	});

  try {
    const res = await axios({
      method: 'get',
      url: 'task/v1/task',
      headers: { Authorization: `Bearer ${token}` },
			data: {
				finalDate: finalDate.toISOString(),
				name,
				userId: userId,
			}
    });
    console.log(res);
    return { err: null, tasks: [] };
  } catch (err) {
    console.log(err);
    return { err, tasks: [] };
  }
}
