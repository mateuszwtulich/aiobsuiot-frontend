import React, { useState } from 'react';

import '../styles/AdminTasks.scss';
import Task from 'components/Task';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import TaskMModel from 'models/Task';
import { Button } from '@material-ui/core';
import CustomModal from './CustomModal';
import TaskForm from './TaskForm';

const initialTasks : TaskMModel[] = [{
  id: '1', title: 'Title1', user: 'floffler', finalDate: new Date(2021, 5, 5), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
},
{
  id: '2', title: 'Title2', user: 'floffler', finalDate: new Date(2021, 5, 5), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
},
{
  id: '3', title: 'Title3', user: 'floffler', finalDate: new Date(2021, 5, 5), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
},
{
  id: '4', title: 'Title4', user: 'floffler', finalDate: new Date(2021, 5, 5), text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
}];

export default function AdminTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  const closeModal = () => setTaskModalOpen(false);

  const handlTaskAdd = (newTask) => {
    setTasks([...tasks, { id: Math.random() * 100, ...newTask }]);
    closeModal();
  };

  const handleTaskRemove = (userId) => {
    setTasks(tasks.filter(({ id }) => id !== userId));
  };

  return (
    <div className="AdminTasks">
      <Header title="Admin tasks" />
      <Wrapper className="content small-padding">
        <div className="top">
          <h2>Manage tasks</h2>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setTaskModalOpen(true)}
          >
            Add new task
          </Button>
        </div>
        {tasks.map(((task) => (
          <Task
            key={task.id}
            task={task}
            onTaskRemove={handleTaskRemove}
          />
        )))}
        <CustomModal
          isOpen={isTaskModalOpen}
          closeModal={closeModal}
        >
          <TaskForm sumbit={handlTaskAdd} />
        </CustomModal>
      </Wrapper>
    </div>
  );
}
