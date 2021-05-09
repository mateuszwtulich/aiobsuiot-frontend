import React from 'react';

import 'styles/ErrorMessage.scss';
import { errorMessages } from 'consts/errors';

export default function ErrorMessage({ error }) {
  return error ? (
    <h5 className="ErrorMessage">{errorMessages[error]}</h5>
  ) : null;
}
