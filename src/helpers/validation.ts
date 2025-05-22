 export const isValidLogin = (login: string): boolean => {
    return !/\d/.test(login);
  };