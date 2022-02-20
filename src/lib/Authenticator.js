/**
 * The Authenticator class
 */

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  signOut,
} from 'firebase/auth';
import {
  getStorage, ref, uploadBytes, getDownloadURL,
} from 'firebase/storage';
import ActivityIndicator from './ActivityIndicator';
import Router from '../Router';
// eslint-disable-next-line import/no-cycle
import { ForgotPasswordComponent } from '../Components';
import User from './User';

/* eslint-disable consistent-return */

class Authenticator {
  constructor() {
    this.errorContainer = document.querySelector('.form-validation');
    this.portal = document.getElementById('portal');
  }

  // displays an error in the errorcontainer
  displayError(error) {
    this.portal.removeChild(this.portal.lastChild);
    this.errorContainer.classList.remove('hide');
    this.errorContainer.innerHTML = `<small>${error}</small>`;
  }

  // removes the error from the errorcontainer
  removeError() {
    this.errorContainer.classList.add('hide');
    this.errorContainer.innerHTML = '';
  }

  // registers the user en stores the data in the database
  async register() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const formData = new FormData(document.querySelector('.register__form'));
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confPassword = formData.get('confirm');
    const avatar = formData.get('avatar');
    let imageUrl = '';

    // if there is an avatar
    if (avatar.size !== 0) {
      // Check if file type is image (https://roufid.com/javascript-check-file-image/)
      if (avatar.type.split('/')[0] === 'image') {
        const storage = getStorage();
        const storageRef = ref(storage, avatar.name);
        await uploadBytes(storageRef, avatar).then(() => {
          getDownloadURL(storageRef).then((downloadUrl) => {
            imageUrl = downloadUrl;
          });
        });
      } else {
        this.displayError('The entered avatar is not an image.');
        document.querySelector("input[name='avatar']").value = '';
      }
    }

    // check to see if all inputs are filled in
    if (username && email && password && confPassword) {
      if (password === confPassword) {
        const auth = getAuth();
        try {
          createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
              updateProfile(result.user, {
                displayName: username, photoURL: imageUrl,
              }).then(async () => {
                const userClass = new User(
                  result.user.uid,
                  username,
                  email,
                  imageUrl,
                );
                await userClass.storeUserData();
                Router.getRouter().navigate('/');
              }).catch((e) => {
                this.displayError(e.message);
              });
            }).catch((e) => {
              this.displayError(e.message);
            });
        } catch (e) {
          this.displayError(e.message);
        }
      } else {
        this.displayError('Password and confirm password do not match, please try again');
      }
    } else {
      this.displayError('You have to fill in all the fields (exept image) to submit.');
    }
  }

  // logs in the user
  async login() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const formData = new FormData(document.querySelector('.login__form'));
    const email = formData.get('email');
    const password = formData.get('password');

    if (email && password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredentials) => {
          const { user } = userCredentials;
          const userClass = new User(user.uid, user.displayName, user.email, user.photoURL);

          // if the users data is complete it goes to the dashboard else it goes to extra info page
          if (await userClass.checkComplete()) {
            Router.getRouter().navigate('/dashboard');
          } else {
            Router.getRouter().navigate('/extra-info');
          }
        })
        .catch((e) => {
          this.displayError(e.messge);
        });
    } else {
      this.displayError('You have to fill in all the fields to login.');
    }
  }

  // sends a resetpassword email to the user
  async resetPassword() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const formData = new FormData(document.querySelector('.forgot-password__form'));
    const email = formData.get('email');

    if (email) {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          const appContainer = document.getElementById('appContainer');
          const forgotPassword = new ForgotPasswordComponent();
          this.portal.removeChild(this.portal.lastChild);
          appContainer.appendChild(forgotPassword.emailSentRender());
        })
        .catch((e) => {
          this.displayError(e.message);
        });
    } else {
      this.displayError('You have to fill in your email to send password reset instructions.');
    }
  }

  // login with google
  async loginGoogle() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { user } = result;
        const {
          displayName, email, photoURL, uid,
        } = user;
        const userClass = new User(uid, displayName, email, photoURL);

        // if the users data is complete it goes to the dashboard else it goes to extra info page
        if (await userClass.checkComplete()) {
          Router.getRouter().navigate('/dashboard');
        } else {
          await userClass.storeUserData();
          Router.getRouter().navigate('/extra-info');
        }
      }).catch((e) => {
        this.displayError(e.message);
      });
  }

  // login with facebook
  async loginFacebook() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { user } = result;
        const {
          displayName, email, photoURL, uid,
        } = user;
        const userClass = new User(uid, displayName, email, photoURL);

        // if the users data is complete it goes to the dashboard else it goes to extra info page
        if (await userClass.checkComplete()) {
          Router.getRouter().navigate('/dashboard');
        } else {
          await userClass.storeUserData();
          Router.getRouter().navigate('/extra-info');
        }
      }).catch((e) => {
        this.displayError(e.message);
      });
  }

  // login with twitter
  async loginTwitter() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const provider = new TwitterAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { user } = result;
        const {
          displayName, email, photoURL, uid,
        } = user;
        const userClass = new User(uid, displayName, email, photoURL);

        // if the users data is complete it goes to the dashboard else it goes to extra info page
        if (await userClass.checkComplete()) {
          Router.getRouter().navigate('/dashboard');
        } else {
          await userClass.storeUserData();
          Router.getRouter().navigate('/extra-info');
        }
      }).catch((e) => {
        this.displayError(e.message);
      });
  }

  // authenticator for the edit profile page
  editAuthenticator() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const formData = new FormData(document.querySelector('.extraInfo__form'));
    const fname = formData.get('firstname');
    const lname = formData.get('lastname');
    const phonenumber = formData.get('phonenumber');

    if (fname && lname && phonenumber) {
      return { fname, lname, phonenumber };
    }

    // displays error message when not all fields are filled in
    this.displayError('You have to fill in all the fields to submit.');
  }

  // authenticator for the extra info form
  userSettingsAuthenticator() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const formData = new FormData(document.querySelector('.profileInfo__form'));
    const username = formData.get('username');
    const firstname = formData.get('firstname');
    const lastname = formData.get('lastname');
    const phonenumber = formData.get('phonenumber');

    if (username && firstname && lastname && phonenumber) {
      return {
        username, firstname, lastname, phonenumber,
      };
    }

    // displays error message when not all fields are filled in
    this.displayError('You have to fill in all the fields to submit.');
  }

  // authenticator for the meldet form
  meldetAuthenticator() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const formData = new FormData(document.querySelector('.meldet__form'));
    const title = formData.get('title');
    const address = formData.get('address');
    const description = formData.get('description');
    const category = formData.get('category');
    const date = formData.get('date');

    if (title && address && category && date) {
      return {
        title, address, description, category, date,
      };
    }

    // displays error message when not all fields are filled in
    this.displayError('You have to fill in all the fields to submit.');
  }

  // authenticator for the create event form
  createAuthenticator() {
    this.removeError();
    this.portal.appendChild(ActivityIndicator());
    const formData = new FormData(document.querySelector('.create__form'));
    const title = formData.get('title');
    const description = formData.get('description');
    const street = formData.get('street');
    const number = formData.get('number');
    const zip = formData.get('zip');
    const city = formData.get('city');
    const datetime = new Date(formData.get('datetime'));
    const invites = formData.get('invites');

    if (title && description && street && number && zip && city && datetime) {
      return {
        title, description, street, number, zip, city, datetime, invites,
      };
    }

    // displays error message when not all fields are filled in
    this.displayError('You have to fill in all the fields to submit.');
  }

  // logs out the current user
  static logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      Router.getRouter().navigate('/');
    });
  }
}

export default Authenticator;
