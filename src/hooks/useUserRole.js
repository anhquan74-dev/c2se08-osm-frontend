import { useSelector } from 'react-redux';

export function useUserRole() {
  // some logic or api call to get the role
  // const isLoggedIn = Boolean(localStorage.getItem("access_token"));

  // for demonstration purposes it's just hard coded
  const { currentUser } = useSelector((state) => state.auth);

  const userRole = currentUser.userRole;

  // return the current user role
  return userRole;
}
