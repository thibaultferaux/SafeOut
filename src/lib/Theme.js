/**
 * My theme helper
 */

const Theme = {
  // changes the cookie from light to dark and vice versa
  // code inspired by Milan Bauwens
  changeCookie() {
    if (document.cookie === 'theme=dark') {
      document.cookie = 'theme=light; expires=Sat, 19 Dec 2022 23:59:59 GMT';
    } else {
      document.cookie = 'theme=dark; expires=Sat, 19 Dec 2022 23:59:59 GMT';
    }
  },

  // sets the theme based on the cookie
  setTheme() {
    const appContainer = document.getElementById('appContainer');
    if (document.cookie === 'theme=dark') {
      appContainer.classList.remove('lightTheme');
      appContainer.classList.add('darkTheme');
    } else {
      appContainer.classList.remove('darkTheme');
      appContainer.classList.add('lightTheme');
    }
  },
};

export default Theme;
