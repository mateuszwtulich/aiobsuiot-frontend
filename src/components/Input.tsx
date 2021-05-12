import React from 'react';
import TextField from '@material-ui/core/TextField';

import 'styles/Input.scss';

export default function Input({
  value, label, type = 'text', handleChange,
}) {
  return (
    <div className="Input">
      <TextField
        id={`outlined-basic-${label}`}
        label={label}
        variant="outlined"
        type={type}
        value={value}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
      />
    </div>
  );
}
