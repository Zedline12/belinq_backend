//not found exceptions 404
export const USER_NOT_FOUND = '404001 User not found';
//unauthorized exceptions 401
export const INVALID_TOKEN = '401001 Invalid token';
export const INVALID_CREDINTALS = '401002 Email or password is incorrect';
//bad request exceptions 400
export const NO_TOKEN_PROVIDED = '400001 No token provided';

//conflict exceptions 409
export const EMAIL_USER_CONFLICT = '409001 User with this email already exists';
export const PHONE_USER_CONFLICT =
  '409001 User with this phone number already exists';
export const COMPANY_USER_CONFLICT =
  '409001 User with this company name already exists';
