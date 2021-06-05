export const INVALID_PASSWORDS = 'INVALID_PASSWORDS';
export const INVALID_CREDENTIALS = 'INVALID_CREDENTIALS';
export const MISSING_FORM_VALUES = 'MISSING_FORM_VALUES';
export const ACCESS_DENIED = 'ACCESS_DENIED';
export const INVALID_EMAIL = 'INVALID_EMAIL';
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
export const NO_PERMISSION_SELECTED = 'NO_PERMISSION_SELECTED';

const errors = {INVALID_PASSWORDS, INVALID_CREDENTIALS, MISSING_FORM_VALUES, ACCESS_DENIED, NO_PERMISSION_SELECTED}

export default errors;

export const errorMessages = {
  INVALID_PASSWORDS: 'Passwords are not the same',
  INVALID_CREDENTIALS: 'Invalid credentials',
  MISSING_FORM_VALUES: 'Some of the required fields are empty',
  ACCESS_DENIED: 'Access denied',
  INVALID_EMAIL: 'Invalid email',
  UNKNOWN_ERROR: 'Unknown error',
  NO_PERMISSION_SELECTED: 'Select new permission',
};


