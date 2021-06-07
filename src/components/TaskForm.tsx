import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "styles/TaskForm.scss";
import Task from "models/Task";
import ErrorMessage from "components/ErrorMessage";
import { MISSING_FORM_VALUES } from "consts/errors";
import formatDate from "utils/formatDate";

export default function TaskForm({
  task,
  submit,
}: {
  task?: Task | null;
  submit;
}) {
  const [name, setName] = useState<string>(task?.name ?? "");
  const [finalDate, setFinalDate] = useState<string>(
    task?.finalDate ?? formatDate(new Date())
  );
  const [error, setError] = useState<string | null>(null);

  const isFormValid = () => name.trim().length > 0;

  const handleSave = () => {
    if (!isFormValid()) {
      setError(MISSING_FORM_VALUES);
      return;
    }

    setError(null);
    submit({ ...task, name, finalDate });
  };

  return (
    <form className="TaskForm" onSubmit={handleSave}>
      <h2>{task ? "Edit task" : "Add new task"}</h2>
      <TextField
        required
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        required
        id="date"
        label="Due date"
        type="date"
        className="dateField"
        defaultValue={finalDate}
        onChange={(e) => setFinalDate(formatDate(new Date(e.target.value)))}
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
