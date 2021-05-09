import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import 'styles/TaskForm.scss';
import Task from 'models/Task';
import formatDate from 'utils/formatDate';
import ErrorMessage from 'components/ErrorMessage';
import { MISSING_FORM_VALUES } from 'consts/errors';

export default function TaskForm({ task, sumbit }:{task?: Task | null, sumbit}) {
  const [title, setTitle] = useState<string>(task?.title ?? '');
  const [text, setText] = useState<string>(task?.text ?? '');
  const [finalDate, setFinalDate] = useState<Date>(task?.finalDate ?? new Date());
  const [error, setError] = useState<string | null>(null);

  const isFormValid = () => title.trim().length > 0;

  const handleSave = () => {
    if (!isFormValid()) {
      setError(MISSING_FORM_VALUES);
      return;
    }

    setError(null);
    const newTask = { title, text, finalDate };
    sumbit(newTask);
  };

  return (
    <form
      className="TaskForm"
      onSubmit={handleSave}
    >
      <h2>{task ? 'Edit task' : 'Add new task'}</h2>
      <TextField
        required
        fullWidth
        label="Name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="standard-textarea"
        label="Description"
        multiline
        fullWidth
        rowsMax={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <TextField
        required
        id="date"
        label="Due date"
        type="date"
        className="dateField"
        defaultValue={formatDate(finalDate)}
        onChange={(e) => setFinalDate(new Date(e.target.value))}
        InputLabelProps={{ shrink: true }}
      />
      <br />
      <ErrorMessage error={error} />
      <div className="buttons">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </form>
  );
}
