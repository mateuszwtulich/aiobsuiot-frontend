import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";

import Header from "components/Header";
import Wrapper from "components/Wrapper";
import Task from "components/Task";
import TaskModel from "models/Task";

import "styles/Tasks.scss";
import {
  addTask,
  fetchUserTasks,
  removeTask,
  editTask,
} from "services/tasksService";
import TaskForm from "./TaskForm";
import CustomModal from "./CustomModal";
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

export default function Tasks() {
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
    const { err, tasks: fetchedTasks } = await fetchUserTasks(authUser.userId);

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
    <div className="Tasks">
      <Header title="Tasks" />
      <Wrapper className="content">
        {_canGetTasks ? (
          <>
            <div className="top">
              <h2>My Tasks</h2>
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
      </Wrapper>
      <CustomModal isOpen={isTaskModalOpen} closeModal={closeModal}>
        <TaskForm task={edittingTask} submit={handleTaskSubmit} />
      </CustomModal>
    </div>
  );
}

const diaplayTasks = ({ tasks, onRemoveTask, onEditTask }) =>
  tasks.length < 1 ? (
    <p>You have no tasks yet</p>
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
