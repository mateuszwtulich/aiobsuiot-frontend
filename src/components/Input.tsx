import React from 'react';
import TextField from '@material-ui/core/TextField';

import 'styles/Input.scss';

export default function Input({ label, type = 'text', handleChange }) {
  return (
    <div className="Input">
      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        type={type}
        onChange={(event) => {
          handleChange(event.target.value);
        }}
      />
    </div>
  );
}
