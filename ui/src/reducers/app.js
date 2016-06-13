const initialState = {
  users: [],
  errorMessage: null,
  roles: []
};

export default function app(state = initialState, { type, users, new_user, error_msg, roles }) {
  switch (type) {
  case 'USERS_RETRIEVED':
    return {
      ...state,
      users: users
    };

  case 'NEW_USER_ERROR_RETRIEVED':
    const newError = (error_msg && (state.errorMessage === error_msg)) ?
      `${error_msg} (again)` : error_msg;
    return {
      ...state,
      errorMessage: newError
    };

  case 'NEW_USER_CREATED':
    return {
      ...state,
      users: [
        ...state.users,
        new_user
      ],
      errorMessage: null
    };

  case 'ROLES_RETRIEVED':
    return {
      ...state,
      roles: roles
    };

  default:
    return state;
  }
}
