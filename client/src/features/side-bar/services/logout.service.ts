export function logoutUser() {
  document.cookie.split(";").forEach(function (c) {
    document.cookie =
      c.replace(/^ +/, "") +
      ";expires=" +
      new Date().toUTCString() +
      ";path=/;";
  });
}
