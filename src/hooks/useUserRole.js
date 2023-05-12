import authApi from '../api/authApi';

export function useUserRole() {
  // some logic or api call to get the role
  // const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  const user = authApi.getUser();
  if (user === null) {
    return '';
  }
  const userRole = user?.roles?.[0]?.name;
  // return the current user role
  return userRole;
}
