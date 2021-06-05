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
import { canAddTask, canGetTasks, canRemoveTask } from "permissions";
import AccessDenied from "./AccessDenied";
import { addTask, fetchTasks, removeTask } from "services/tasksService";

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

  const handleAddTask = async (newTask: TaskModel) => {
    const { err } = await addTask({ task: newTask, userId: authUser.userId });

    if (err) {
      setError(err);
    } else {
      setError(null);
    }

    await fetch();
    closeModal();
  };

  const handleTaskRemove = async (taskId: string) => {
    const { err } = await removeTask(taskId);

    if (err) {
      setError(err);
    } else {
      setError(null);
    }

    await fetch();
  };

  const closeModal = () => {
    setEdittingTask(null);
    setTaskModalOpen(false);
  };

  return (
    <div className="AdminTasks">
      <Header title="Admin tasks" />
      <Wrapper className="content small-padding">
        {_canGetTasks ? (
          <>
            <div className="top">
              <h2>Admin tasks</h2>
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
                onTaskRemove: _canRemoveTask ? handleTaskRemove : null,
              })
            )}
          </>
        ) : (
          <AccessDenied />
        )}
        <CustomModal isOpen={isTaskModalOpen} closeModal={closeModal}>
          <TaskForm task={edittingTask} submit={handleAddTask} />
        </CustomModal>
      </Wrapper>
    </div>
  );
}

const diaplayTasks = ({ tasks, onTaskRemove }) =>
  tasks.length < 1 ? (
    <p>There is no tasks</p>
  ) : (
    tasks.map((task) => (
      <Task key={task.id} task={task} onTaskRemove={onTaskRemove} />
    ))
  );
