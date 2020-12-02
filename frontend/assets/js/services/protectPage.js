export default (() => {
  const sessionToken = sessionStorage.getItem('token');

  if (!sessionToken) {
    window.location = '/';
  }
})()