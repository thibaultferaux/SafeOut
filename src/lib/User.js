/**
 * The user class
 */

import { deleteUser, getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  doc, setDoc, getDoc, getFirestore, deleteDoc, updateDoc,
} from 'firebase/firestore';
import Router from '../Router';
import ActivityIndicator from './ActivityIndicator';

class User {
  constructor(id = '', username = '', email = '', avatar = '', firstname = '', lastname = '', phoneNumber = '') {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
    this.hasAvatar = !!this.avatar;
  }

  // sets the user values of the class
  setUserData(id = '', username = '', email = '', avatar = '', firstname = '', lastname = '', phoneNumber = '') {
    this.id = id;
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.firstname = firstname;
    this.lastname = lastname;
    this.phoneNumber = phoneNumber;
    this.hasAvatar = !!this.avatar;
  }

  // stores the user values in the users database and the click counter in the clicks database
  async storeUserData() {
    const db = getFirestore();
    await setDoc(doc(db, 'users', this.id), {
      username: this.username,
      email: this.email,
      avatar: this.avatar,
      firstname: this.firstname,
      lastname: this.lastname,
      phoneNumber: this.phoneNumber,
      hasAvatar: this.hasAvatar,
    });
    await setDoc(doc(db, 'clicks', this.id), {
      clicks: 1000,
    });
  }

  // checks if the users details are all filled in
  async checkComplete() {
    const db = getFirestore();
    const docSnap = await getDoc(doc(db, 'users', this.id));
    if (docSnap.exists()) {
      return !!docSnap.data().firstname;
    }
    return false;
  }

  // gets the current user id, if the user is not loggin in it redirects to the login page
  static getUserId() {
    const auth = getAuth();
    const user = auth.currentUser;
    return new Promise((resolve) => {
      if (user) {
        resolve(user.uid);
      } else {
        Router.getRouter().navigate('/');
      }
    });
  }

  // updates the user data in the database
  static async updateUserData(uid, fname, lname, phonenumber, username) {
    const db = getFirestore();
    const docRef = doc(db, 'users', uid);
    if (username) {
      await updateDoc(docRef, {
        firstname: fname,
        lastname: lname,
        phoneNumber: phonenumber,
        username,
      });
    } else {
      await updateDoc(docRef, {
        firstname: fname,
        lastname: lname,
        phoneNumber: phonenumber,
      });
    }
  }

  // gets the ll data of the current user
  // when the user is not logged in it redirects to the login page
  static async getCurrentUserData() {
    const db = getFirestore();
    const auth = getAuth();
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docSnap = await getDoc(doc(db, 'users', user.uid));
          const userObject = docSnap.data();
          userObject.uid = user.uid;
          resolve(userObject);
        } else {
          Router.getRouter().navigate('/');
        }
      });
    });
  }

  // get the click count of the current user
  static async getCurrentUserClicks() {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      const docSnap = await getDoc(doc(db, 'clicks', user.uid));
      resolve(docSnap.data().clicks);
    });
  }

  // deletes all the data of the current user and redirects to the login page
  static async deleteCurrentUser() {
    const portal = document.getElementById('portal');
    while (portal.firstChild) {
      portal.removeChild(portal.lastChild);
    }
    portal.appendChild(ActivityIndicator());
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;
    await deleteDoc(doc(db, 'users', user.uid));
    await deleteDoc(doc(db, 'clicks', user.uid));
    deleteUser(user).then(() => {
      Router.getRouter().navigate('/');
    });
  }
}

export default User;
