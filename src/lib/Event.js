/**
 * The event class
 */

import {
  addDoc, getFirestore, collection, query, where, getDocs, orderBy,
} from 'firebase/firestore';

class Event {
  constructor(creatorId = '', creatorName = '', title = '', description = '', street = '', number = '', zip = '', city = '', start = '', invitedUsers = [], joinedUsers = [], picture = '', end = '') {
    this.creatorId = creatorId;
    this.creatorName = creatorName;
    this.title = title;
    this.description = description;
    this.street = street;
    this.number = number;
    this.zip = zip;
    this.city = city;
    this.invitedUsers = invitedUsers;
    this.joinedUsers = joinedUsers;
    this.picture = picture;
    this.start = start;
    this.end = end;
    this.createdOn = new Date();
    this.editedOn = '';
  }

  // stores the event data in the database
  async storeEventData() {
    const db = getFirestore();
    await addDoc(collection(db, 'events'), {
      creatorId: this.creatorId,
      creatorName: this.creatorName,
      title: this.title,
      description: this.description,
      street: this.street,
      number: this.number,
      zip: this.zip,
      city: this.city,
      invitedUsers: this.invitedUsers,
      joinedUsers: this.joinedUsers,
      picture: this.picture,
      start: this.start,
      end: this.end,
      createdOn: this.createdOn,
      editedOn: this.editedOn,
    });
  }

  // gets the current users created events
  static async getOwnEvents(uid) {
    const db = getFirestore();
    const q = query(collection(db, 'events'), where('creatorId', '==', uid), orderBy('start', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      start: doc.data().start.toDate(),
    }));
  }

  // gets the current users joined events
  static async getJoinedEvents(uid) {
    const db = getFirestore();
    const q = query(collection(db, 'events'), where('joinedUsers', 'array-contains', uid), orderBy('start', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      start: doc.data().start.toDate(),
    }));
  }
}

export default Event;
