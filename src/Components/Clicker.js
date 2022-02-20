/**
 * My Clicker Component
 */

import { getFirestore, updateDoc, doc } from 'firebase/firestore';
import ActivityIndicator from '../lib/ActivityIndicator';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Theme from '../lib/Theme';
import User from '../lib/User';

class ClickerContainer extends Component {
  constructor() {
    super({
      name: 'clicker',
      routerPath: '/clicker',
    });
    this.userObject = {};
    this.clickCount = 1000;
  }

  /* eslint-disable global-require */

  // gets the egg image to display according to how many times the egg is clicked
  getEggImage() {
    if (this.clickCount > 800) {
      return require('../img/egg1.png');
    } if (this.clickCount > 600) {
      return require('../img/egg2.png');
    } if (this.clickCount > 400) {
      return require('../img/egg3.png');
    } if (this.clickCount > 200) {
      return require('../img/egg4.png');
    } if (this.clickCount > 0) {
      return require('../img/egg5.png');
    }

    // when the counter is 0 it renders the surprise
    const portal = document.getElementById('portal');
    this.componentContainer.innerHTML = '';
    portal.appendChild(ActivityIndicator());
    return this.renderReward()
      .then((renderedComponent) => {
        while (portal.firstChild) {
          portal.removeChild(portal.lastChild);
        }
        this.componentContainer.appendChild(renderedComponent);
      });
  }

  // stores how many times the user has left to click in a database
  storeClicks() {
    const db = getFirestore();
    const docRef = doc(db, 'clicks', this.userObject.uid);
    updateDoc(docRef, {
      clicks: this.clickCount,
    });
  }

  async renderAsync() {
    // sets light or dark theme
    Theme.setTheme();
    // gets the user data from the database
    this.userObject = await User.getCurrentUserData();
    // gets the clicker counter for this user
    this.clickCount = await User.getCurrentUserClicks();
    // when the counter is 0, it renders the surprise
    if (this.clickCount === 0) {
      document.getElementById('portal').appendChild(ActivityIndicator());
      return this.renderReward();
    }

    // create header
    const header = Elements.createHeader({ title: 'Destroy the egg', img: this.userObject.avatar });

    // create main
    const count = Elements.createHeading({ size: 1, textContent: this.clickCount, classNames: ['clicker__counter'] });

    const egg = Elements.createButton({
      classNames: ['clicker__click'],
      children: [
        Elements.createImage({ src: this.getEggImage(), alt: 'egg', classNames: ['clicker__egg'] }),
      ],
      onClick: () => {
        // decreases the counter when clicked
        this.clickCount -= 1;
        this.storeClicks();
        document.querySelector('.clicker__counter').textContent = this.clickCount;
        document.querySelector('.clicker__egg').src = this.getEggImage();
      },
    });

    const container = Elements.createContainer({
      classNames: ['clicker__container'],
      children: [
        count,
        egg,
        Elements.createParagraph({ classNames: ['clicker__instructions'], textContent: 'Tap the egg to break it' }),
      ],
    });

    this.componentContainer.appendChild(
      Elements.createContainer({
        classNames: ['overflowY'],
        children: [
          header,
          Elements.createMain({
            classNames: ['main'],
            children: [
              Elements.createContainer({
                classNames: ['clicker'],
                children: [container],
              }),
            ],
          }),
        ],
      }),
    );

    const navigation = Elements.createNavigation();
    navigation.getElementsByClassName('navigation__item')[2].classList.add('navigation__item--selected');
    return navigation;
  }

  // when the user click counter is 0 it renders the reward
  async renderReward() {
    this.userObject = await User.getCurrentUserData();

    // create header
    const header = Elements.createHeader({ title: 'Destroy the egg', img: this.userObject.avatar });

    const container = Elements.createContainer({
      classNames: ['clicker__container'],
      children: [
        Elements.createHeading({ size: 1, textContent: 'Congratulations', classNames: ['clicker__title'] }),
        Elements.createParagraph({ classNames: ['clicker__description'], textContent: 'You unlocked a €15 discount for Uber Eats' }),
        Elements.createImage({ src: require('../img/Uber-Eats-Logo.png'), classNames: ['clicker__uberEats'], alt: 'uber eats logo' }),
        Elements.createHeading({ size: 2, textContent: 'eats-vf8ypg', classNames: ['clicker__code'] }),
      ],
    });

    this.componentContainer.appendChild(
      Elements.createContainer({
        classNames: ['overflowY'],
        children: [
          header,
          Elements.createMain({
            classNames: ['main'],
            children: [
              Elements.createContainer({
                classNames: ['clicker'],
                children: [container],
              }),
            ],
          }),
        ],
      }),
    );

    if (document.cookie === 'theme=dark') {
      document.querySelector('.clicker__uberEats').src = require('../img/Uber-Eats-Logo-White.png');
    }

    const navigation = Elements.createNavigation();
    navigation.getElementsByClassName('navigation__item')[2].classList.add('navigation__item--selected');
    return navigation;
  }
}

export default ClickerContainer;
