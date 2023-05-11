import jwt_decode from 'jwt-decode';

export function getEXPToken(token) {
  const decodeToken = jwt_decode(token);
  const expToken = decodeToken.exp * 1000;
  const dateToken = new Date(expToken);
  const formattedDateToken = dateToken.toLocaleString();
  return formattedDateToken;
}
export function getTimeNow() {
  const dateNow = new Date();
  const formattedDateNow = dateNow.toLocaleString();
  return formattedDateNow;
}
