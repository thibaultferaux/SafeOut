/**
 * My Dashboard Component
 */

// eslint-disable-next-line import/no-cycle
import Authenticator from '../lib/Authenticator';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Modal from '../lib/Modal';
import Theme from '../lib/Theme';
import User from '../lib/User';

class SettingsComponent extends Component {
  constructor() {
    super({
      name: 'settings',
      routerPath: '/settings',
    });
    this.userObject = {};
  }

  async renderAsync() {
    // sets the light or dark theme
    Theme.setTheme();
    // gets the user data from the database
    this.userObject = await User.getCurrentUserData();

    // create header
    const header = Elements.createHeader({ title: 'Settings', img: this.userObject.avatar });

    // create main
    const theme = Elements.createContainer({
      classNames: ['theme'],
      children: [
        Elements.createHeading({ size: 2, classNames: ['theme__title'], textContent: 'Theme' }),
        Elements.createToggleTheme({
          onChange: () => {
            Theme.changeCookie();
            Theme.setTheme();
          },
        }),
      ],
    });

    const infoTop = Elements.createContainer({
      classNames: ['profileInfo__top'],
      children: [
        Elements.createHeading({ size: 2, classNames: ['profileInfo__title'], textContent: 'Profile info' }),
        Elements.createSmallButton({
          children: [
            Elements.createIcon({ classNames: ['fas', 'fa-pen'] }),
            Elements.createParagraph({ textContent: 'Edit', classNames: ['smallBtn__text'] }),
          ],
          onClick: () => {
            // renders the input fields with the current user data values in it
            this.renderEdit();
          },
        }),
      ],
    });

    const username = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Username', classNames: ['profileInfo__label'] }),
        Elements.createParagraph({ textContent: this.userObject.username ? this.userObject.username : 'Yet to be set', classNames: ['profileInfo__username'] }),
      ],
    });

    const firstname = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Firstname', classNames: ['profileInfo__label'] }),
        Elements.createParagraph({ textContent: this.userObject.firstname ? this.userObject.firstname : 'Yet to be set', classNames: ['profileInfo__firstname'] }),
      ],
    });

    const lastname = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Lastname', classNames: ['profileInfo__label'] }),
        Elements.createParagraph({ textContent: this.userObject.lastname ? this.userObject.lastname : 'Yet to be set', classNames: ['profileInfo__lastname'] }),
      ],
    });

    const phoneNumber = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Phonenumber', classNames: ['profileInfo__label'] }),
        Elements.createParagraph({ textContent: this.userObject.phoneNumber ? this.userObject.phoneNumber : 'Yet to be set', classNames: ['profileInfo__phoneNumber'] }),
      ],
    });

    const email = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Email', classNames: ['profileInfo__label'] }),
        Elements.createParagraph({ textContent: this.userObject.email ? this.userObject.email : 'Yet to be set', classNames: ['profileInfo__email'] }),
      ],
    });

    const logoutBtn = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createRedButton({
          children: [
            Elements.createIcon({ classNames: ['fas', 'fa-sign-out-alt'] }),
            Elements.createParagraph({ textContent: 'Logout' }),
          ],
          modifier: 'yellow',
          onClick: () => {
            Authenticator.logout();
          },
        }),
      ],
    });

    const deleteBtn = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createRedButton({
          children: [
            Elements.createIcon({ classNames: ['fas', 'fa-trash'] }),
            Elements.createParagraph({ textContent: 'Delete Account' }),
          ],
          onClick: () => {
            const portal = document.getElementById('portal');
            // shows modal with confirmation prompt
            portal.appendChild(Modal({
              title: 'Delete Account',
              description: 'Are you sure you want to delete your account?',
              textButton1: 'Cancel',
              onClick1: () => {
                while (portal.firstChild) {
                  portal.removeChild(portal.lastChild);
                }
              },
              textButton2: 'Delete',
              onClick2: () => {
                User.deleteCurrentUser();
              },
            }));
          },
        }),
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
              theme,
              Elements.createContainer({
                classNames: ['profileInfo'],
                children: [
                  infoTop,
                  username,
                  firstname,
                  lastname,
                  phoneNumber,
                  email,
                  logoutBtn,
                  deleteBtn,
                ],
              }),
            ],
          }),
        ],
      }),
    );

    // toggle the switch when darktheme is active
    if (document.cookie === 'theme=dark') {
      document.getElementById('toggleTheme').checked = true;
    }

    const navigation = Elements.createNavigation();
    navigation.getElementsByClassName('navigation__item')[3].classList.add('navigation__item--selected');
    return navigation;
  }

  // renders edit page to edit the user details
  renderEdit() {
    const appContainer = document.getElementById('appContainer');
    const portal = document.getElementById('portal');
    const profileInfoContainer = document.querySelector('.profileInfo');
    profileInfoContainer.innerHTML = '';

    const infoTop = Elements.createContainer({
      classNames: ['profileInfo__top'],
      children: [
        Elements.createHeading({ size: 2, classNames: ['profileInfo__title'], textContent: 'Profile info' }),
      ],
    });

    const validation = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createFormValidation(),
      ],
    });

    const username = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Username', classNames: ['profileInfo__label'] }),
        Elements.createInput({
          type: 'text', name: 'username', classNames: ['profileInfo__username', 'tertiaryInput'], value: this.userObject.username,
        }),
      ],
    });

    const firstname = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Firstname', classNames: ['profileInfo__label'] }),
        Elements.createInput({
          type: 'text', name: 'firstname', classNames: ['profileInfo__firstname', 'tertiaryInput'], value: this.userObject.firstname,
        }),

      ],
    });

    const lastname = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Lastname', classNames: ['profileInfo__label'] }),
        Elements.createInput({
          type: 'text', name: 'lastname', classNames: ['profileInfo__lastname', 'tertiaryInput'], value: this.userObject.lastname,
        }),

      ],
    });

    const phoneNumber = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Phonenumber', classNames: ['profileInfo__label'] }),
        Elements.createInput({
          type: 'tel', name: 'phonenumber', classNames: ['profileInfo__phoneNumber', 'tertiaryInput'], value: this.userObject.phoneNumber,
        }),

      ],
    });

    const email = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmall({ textContent: 'Email', classNames: ['profileInfo__label'] }),
        Elements.createParagraph({ textContent: this.userObject.email ? this.userObject.email : 'Yet to be set', classNames: ['profileInfo__email'] }),
      ],
    });

    const submit = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createSmallButton({
          children: [
            Elements.createParagraph({ textContent: 'Submit', classNames: ['smallBtn__text'] }),
          ],
          onClick: async () => {
            const auth = new Authenticator();
            const inputs = auth.userSettingsAuthenticator();
            if (inputs) {
              await User.updateUserData(
                this.userObject.uid,
                inputs.firstname,
                inputs.lastname,
                inputs.phonenumber,
                inputs.username,
              );
              appContainer.innerHTML = '';

              // renders the normal settings page when submited
              this.renderAsync()
                .then((renderedComponent) => {
                  while (portal.firstChild) {
                    portal.removeChild(portal.lastChild);
                  }
                  appContainer.appendChild(renderedComponent);
                });
            }
          },
        }),
      ],
    });

    const form = Elements.createForm({
      classNames: ['profileInfo__form'],
      children: [
        infoTop,
        validation,
        username,
        firstname,
        lastname,
        phoneNumber,
        email,
        submit,
      ],
    });

    profileInfoContainer.appendChild(form);

    const logoutBtn = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createRedButton({
          children: [
            Elements.createIcon({ classNames: ['fas', 'fa-sign-out-alt'] }),
            Elements.createParagraph({ textContent: 'Logout' }),
          ],
          modifier: 'yellow',
          onClick: () => {
            Authenticator.logout();
          },
        }),
      ],
    });

    profileInfoContainer.appendChild(logoutBtn);

    const deleteBtn = Elements.createContainer({
      classNames: ['profileInfo__item'],
      children: [
        Elements.createRedButton({
          children: [
            Elements.createIcon({ classNames: ['fas', 'fa-trash'] }),
            Elements.createParagraph({ textContent: 'Delete Account' }),
          ],
          onClick: () => {
            portal.appendChild(Modal({
              title: 'Delete Account',
              description: 'Are you sure you want to delete your account?',
              textButton1: 'Cancel',
              onClick1: () => {
                while (portal.firstChild) {
                  portal.removeChild(portal.lastChild);
                }
              },
              textButton2: 'Delete',
              onClick2: () => {
                User.deleteCurrentUser();
              },
            }));
          },
        }),
      ],
    });

    profileInfoContainer.appendChild(deleteBtn);
  }
}

export default SettingsComponent;
