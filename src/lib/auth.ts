export function isAuthenticated() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return Boolean(token && user);
}