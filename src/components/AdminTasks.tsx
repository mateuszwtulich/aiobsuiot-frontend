import React, { useState } from 'react';

import '../styles/AdminTasks.scss';
import Task from 'components/Task';
import Header from 'components/Header';
import Wrapper from 'components/Wrapper';
import TaskModel from 'models/Task';
import { Button } from '@material-ui/core';
import CustomModal from './CustomModal';
import TaskForm from './TaskForm';

export default function AdminTasks() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [edittingTask, setEdittingTask] = useState<TaskModel | null>(null);

  const closeModal = () => {
    setEdittingTask(null);
    setTaskModalOpen(false);
  };

  const handlTaskAdd = (newTask) => {
    if (edittingTask) {
      const newTasks = tasks.map((task) => (task.id === edittingTask.id ? { ...tasks, ...newTask } : task));
      setTasks(newTasks);
    } else {
      setTasks([...tasks, { id: Math.random() * 100, ...newTask }]);
    }
    closeModal();
  };

  const handleTaskRemove = (userId) => {
    setTasks(tasks.filter(({ id }) => id !== userId));
  };

  const handleTaskEdit = (taskId) => {
    setEdittingTask(tasks.find(({ id }) => id === taskId) ?? null);
    setTaskModalOpen(true);
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
            onTaskEdit={handleTaskEdit}
          />
        )))}
        <CustomModal
          isOpen={isTaskModalOpen}
          closeModal={closeModal}
        >
          <TaskForm
            task={edittingTask}
            sumbit={handlTaskAdd}
          />
        </CustomModal>
      </Wrapper>
    </div>
  );
}
