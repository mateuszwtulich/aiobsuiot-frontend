import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';

import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import Task from 'components/Task';
import TaskModel from 'models/Task';

import 'styles/Tasks.scss';
import { addTask, fetchTasks } from 'services/tasksService';
import TaskForm from './TaskForm';
import CustomModal from './CustomModal';
import SimpleLoader from './SimpleLoader';
import ErrorMessage from './ErrorMessage';
import { useAuth } from 'contexts/AuthContext';

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
	const {authUser} = useAuth();

	console.log(authUser);
	

  const closeModal = () => setTaskModalOpen(false);

  const handleAddTask = (newTask: TaskModel) => {
		addTask({task: newTask, userId:authUser.userId});
    closeModal();
  };

  useEffect(() => {
    const fetch = async () => {
      const { err, tasks: fetchedTasks } = await fetchTasks();
      if (err) {
        setError(err);
      } else {
        setTasks(fetchedTasks);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="Tasks">
      <Header title="Tasks" />
      <Wrapper className="content">
        <div className="top">
          <h2>My Tasks</h2>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => setTaskModalOpen(true)}
          >
            Add new task
          </Button>
        </div>
        <ErrorMessage error={error} />
        {loading ? <SimpleLoader /> : diaplayTasks(tasks)}
      </Wrapper>
      <CustomModal
        isOpen={isTaskModalOpen}
        closeModal={closeModal}
      >
        <TaskForm sumbit={handleAddTask} />
      </CustomModal>
    </div>
  );
}

const diaplayTasks = (tasks) => (tasks.length < 1 ? <p>You have no tasks yet</p> : tasks.map(((task) => (
  <Task
    key={task.id}
    task={task}
  />
))));
