/**
 * My Extra Info Component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
// eslint-disable-next-line import/no-cycle
import Authenticator from '../lib/Authenticator';
import User from '../lib/User';
import Router from '../Router';

class ExtraInfoComponent extends Component {
  constructor() {
    super({
      name: 'extra-info',
      routerPath: '/extra-info',
    });
  }

  render() {
    // removes any theme there is
    this.componentContainer.classList.remove('lightTheme');
    this.componentContainer.classList.remove('darkTheme');

    // create extra info form
    const firstnameInput = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createInput({
          type: 'text', name: 'firstname', placeholder: 'Firstname', classNames: ['primary-input'],
        }),
        Elements.createIcon({ classNames: ['fas', 'fa-user', 'input-icon'] }),
      ],
    });

    const lastnameInput = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createInput({
          type: 'text', name: 'lastname', placeholder: 'Lastname', classNames: ['primary-input'],
        }),
        Elements.createIcon({ classNames: ['fas', 'fa-user', 'input-icon'] }),
      ],
    });

    const phonenumberInput = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createInput({
          type: 'tel', name: 'phonenumber', placeholder: 'Phonenumber', classNames: ['primary-input'],
        }),
        Elements.createIcon({ classNames: ['fas', 'fa-phone-alt', 'input-icon'] }),
      ],
    });

    const submitButton = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createPrimaryButton({
          textContent: 'Submit',
          onClick: () => {
            User.getUserId().then(async (uid) => {
              const auth = new Authenticator();
              const inputs = auth.editAuthenticator();
              if (inputs) {
                await User.updateUserData(
                  uid,
                  inputs.fname,
                  inputs.lname,
                  inputs.phonenumber,
                );
                Router.getRouter().navigate('/dashboard');
              }
            });
          },
        }),
      ],
    });

    const form = Elements.createForm({
      classNames: ['extraInfo__form'],
      children: [
        firstnameInput,
        lastnameInput,
        phonenumberInput,
        submitButton,
      ],
    });

    const extraInfoContainer = Elements.createContainer({
      classNames: ['extraInfo'],
      children: [
        Elements.createHeading({ size: 1, classNames: ['extraInfo__title', 'text-center'], textContent: 'Additional info' }),
        Elements.createFormValidation(),
        form,
      ],
    });

    return extraInfoContainer;
  }
}

export default ExtraInfoComponent;
