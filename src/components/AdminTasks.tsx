import React, { useState, useEffect } from "react";

import "../styles/AdminTasks.scss";
import Task from "components/Task";
import Header from "components/Header";
import Wrapper from "components/Wrapper";
import TaskModel from "models/Task";
import { Button } from "@material-ui/core";
import CustomModal from "./CustomModal";
import TaskForm from "./TaskForm";
import SimpleLoader from "./SimpleLoader";
import ErrorMessage from "./ErrorMessage";
import { useAuth } from "contexts/AuthContext";
import {
  canAddTask,
  canGetTasks,
  canRemoveTask,
  canEditTask,
} from "permissions";
import AccessDenied from "./AccessDenied";
import {
  addTask,
  fetchTasks,
  removeTask,
  editTask,
} from "services/tasksService";

export default function AdminTasks() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [edittingTask, setEdittingTask] = useState<TaskModel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { authUser } = useAuth();

  const _canRemoveTask: boolean = canRemoveTask(authUser);
  const _canGetTasks: boolean = canGetTasks(authUser);
  const _canAddTask: boolean = canAddTask(authUser);
  const _canEditTask: boolean = canEditTask(authUser);

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const { err, tasks: fetchedTasks } = await fetchTasks();

    if (err) {
      setError(err);
    } else {
      setTasks(fetchedTasks);
    }
    setLoading(false);
  };

  const handleErrorAndRefesh = async (err: string) => {
    if (err) {
      setError(err);
    } else {
      setError(null);
    }

    await fetch();
  };

  const handleTaskSubmit = async (newTask) => {
    setTaskModalOpen(false);
    setLoading(true);

    if (edittingTask) {
      const { err } = await editTask({
        task: newTask,
        userId: authUser.userId,
      });
      await handleErrorAndRefesh(err);
    } else {
      const { err } = await addTask({ task: newTask, userId: authUser.userId });
      await handleErrorAndRefesh(err);
    }

    setLoading(false);
  };

  const handleRemoveTask = async (userId: string) => {
    const { err } = await removeTask(userId);
    await handleErrorAndRefesh(err);
  };

  const handleEditTask = (taskId) => {
    const task = (tasks || []).find(({ id }) => id === taskId);
    setEdittingTask(task ?? null);
    setTaskModalOpen(true);
  };

  const closeModal = () => {
    setEdittingTask(null);
    setTaskModalOpen(false);
  };

  return (
    <div className="AdminTasks">
      <Header title="All tasks" />
      <Wrapper className="content small-padding">
        {_canGetTasks ? (
          <>
            <div className="top">
              <h2>All tasks</h2>
              {_canAddTask && (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setTaskModalOpen(true)}
                >
                  Add new task
                </Button>
              )}
            </div>
            <ErrorMessage error={error} />
            {loading ? (
              <SimpleLoader />
            ) : (
              diaplayTasks({
                tasks,
                onRemoveTask: _canRemoveTask ? handleRemoveTask : null,
                onEditTask: _canEditTask ? handleEditTask : null,
              })
            )}
          </>
        ) : (
          <AccessDenied />
        )}
        <CustomModal isOpen={isTaskModalOpen} closeModal={closeModal}>
          <TaskForm task={edittingTask} submit={handleTaskSubmit} />
        </CustomModal>
      </Wrapper>
    </div>
  );
}

const diaplayTasks = ({ tasks, onRemoveTask, onEditTask }) =>
  tasks.length < 1 ? (
    <p>There is no tasks</p>
  ) : (
    tasks.map((task) => (
      <Task
        key={task.id}
        task={task}
        onRemoveTask={onRemoveTask}
        onEditTask={onEditTask}
      />
    ))
  );
