/**
 * My Forgot Password Component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
// eslint-disable-next-line import/no-cycle
import Authenticator from '../lib/Authenticator';
import Router from '../Router';

class ForgotPasswordComponent extends Component {
  constructor() {
    super({
      name: 'forgotpassword',
      routerPath: '/forgotpassword',
    });
  }

  render() {
    // removes any theme there is
    this.componentContainer.classList.remove('lightTheme');
    this.componentContainer.classList.remove('darkTheme');

    // create forgot password form
    const text = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createParagraph({ textContent: 'Enter your registered email below to receive password reset instructions', classNames: ['transparent-text'] }),
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

    const sendButton = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createPrimaryButton({
          textContent: 'Send',
          onClick: () => {
            const auth = new Authenticator();
            auth.resetPassword();
          },
        }),
      ],
    });

    const loginSection = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createParagraph({
          children: [
            Elements.createSpan({ classNames: ['transparent-text'], textContent: 'Remember password? ' }),
            Elements.createLink({ href: '/', classNames: ['underline--white'], textContent: 'Log in' }),
          ],
        }),
      ],
    });

    const form = Elements.createForm({
      classNames: ['forgot-password__form'],
      children: [
        text,
        emailInput,
        sendButton,
        loginSection,
      ],
    });

    const container = Elements.createContainer({
      classNames: ['forgot-password'],
      children: [
        Elements.createHeading({ size: 1, classNames: ['forgot-password__title', 'text-center'], innerHTML: 'Forgot your<br>password?' }),
        Elements.createFormValidation(),
        form,
      ],
    });

    return container;
  }

  // when the email is sent the page renders a confirmation text
  emailSentRender() {
    this.componentContainer.classList.remove('lightTheme');
    this.componentContainer.classList.remove('darkTheme');
    // clear our component container
    this.clearComponentContainer();

    // create forgot password form
    const text = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createParagraph({ innerHTML: 'Please check your inbox and click in the received link to reset your password<br>The mail could be in your spam folder.', classNames: ['transparent-text'] }),
      ],
    });

    const loginButton = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createPrimaryButton({
          textContent: 'Login',
          onClick: () => {
            Router.getRouter().navigate('/');
          },
        }),
      ],
    });

    const form = Elements.createForm({
      classNames: ['forgot-password__form'],
      children: [
        text,
        loginButton,
      ],
    });

    const container = Elements.createContainer({
      classNames: ['forgot-password'],
      children: [
        Elements.createHeading({ size: 1, classNames: ['forgot-password__title', 'text-center'], textContent: 'Email has been sent!' }),
        form,
      ],
    });

    return container;
  }
}

export default ForgotPasswordComponent;
