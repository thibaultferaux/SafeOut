/**
 * My Register Component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
// eslint-disable-next-line import/no-cycle
import Authenticator from '../lib/Authenticator';

class RegisterComponent extends Component {
  constructor() {
    super({
      name: 'register',
      routerPath: '/register',
    });
  }

  render() {
    // removes any theme there is
    this.componentContainer.classList.remove('lightTheme');
    this.componentContainer.classList.remove('darkTheme');

    // create register form
    const avatarInput = Elements.createAvatarInput({ name: 'avatar' });

    const usernameInput = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createInput({
          type: 'text', name: 'username', placeholder: 'Username', classNames: ['primary-input'],
        }),
        Elements.createIcon({ classNames: ['fas', 'fa-user', 'input-icon'] }),
      ],
    });

    const emailInput = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createInput({
          type: 'email', name: 'email', placeholder: 'Email', classNames: ['primary-input'],
        }),
        Elements.createIcon({ classNames: ['fas', 'fa-envelope', 'input-icon'] }),
      ],
    });

    const passwordInput = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createInput({
          type: 'password', name: 'password', placeholder: 'Password', classNames: ['primary-input'],
        }),
        Elements.createIcon({ classNames: ['fas', 'fa-lock', 'input-icon'] }),
      ],
    });

    const confirmPasswordInput = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createInput({
          type: 'password', name: 'confirm', placeholder: 'Confirm Password', classNames: ['primary-input'],
        }),
        Elements.createIcon({ classNames: ['fas', 'fa-lock', 'input-icon'] }),
      ],
    });

    const registerButton = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createPrimaryButton({
          textContent: 'Register',
          onClick: () => {
            const auth = new Authenticator();
            auth.register();
          },
        }),
      ],
    });

    const loginSection = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createParagraph({
          children: [
            Elements.createSpan({ classNames: ['transparent-text'], textContent: 'Already have an account? ' }),
            Elements.createLink({ href: '/', classNames: ['underline--white'], textContent: 'Log in' }),
          ],
        }),
      ],
    });

    const form = Elements.createForm({
      classNames: ['register__form'],
      children: [
        avatarInput,
        usernameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        registerButton,
        loginSection,
      ],
    });

    const registerContainer = Elements.createContainer({
      classNames: ['register'],
      children: [
        Elements.createHeading({ size: 1, classNames: ['register__title', 'text-center'], textContent: 'Register' }),
        Elements.createFormValidation(),
        form,
      ],
    });

    return registerContainer;
  }
}

export default RegisterComponent;
