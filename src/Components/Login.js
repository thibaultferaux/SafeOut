/**
 * My Login Component
 */

// eslint-disable-next-line import/no-cycle
import Authenticator from '../lib/Authenticator';
import Component from '../lib/Component';
import Elements from '../lib/Elements';

class LoginComponent extends Component {
  constructor() {
    super({
      name: 'login',
      routerPath: '/',
    });
  }

  render() {
    // removes any theme there is
    this.componentContainer.classList.remove('lightTheme');
    this.componentContainer.classList.remove('darkTheme');

    // create a header
    const logo = Elements.createImage({
      // eslint-disable-next-line global-require
      src: require('../img/logo-grey.png'),
      alt: 'Logo SafeOut',
    });

    const logoContainer = Elements.createContainer({
      classNames: ['logo-container'],
      children: [logo],
    });

    this.componentContainer.appendChild(logoContainer);

    // create main login
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
        Elements.createLink({ href: '/forgotpassword', classNames: ['login__forgot-password'], innerHTML: '<small>Forgot Password?</small>' }),
      ],
    });

    const loginButton = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createPrimaryButton({
          textContent: 'Login',
          onClick: () => {
            const auth = new Authenticator();
            auth.login();
          },
        }),
      ],
    });

    const continueWithText = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createParagraph({ textContent: 'or continue with', classNames: ['transparent-text'] }),
      ],
    });

    const socialMediaButtons = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createSocialMediaButton({
          // eslint-disable-next-line global-require
          src: require('../img/google.png'),
          alt: 'logo google',
          onClick: () => {
            const auth = new Authenticator();
            auth.loginGoogle();
          },
        }),
        Elements.createSocialMediaButton({
          // eslint-disable-next-line global-require
          src: require('../img/facebook.png'),
          alt: 'logo facebook',
          onClick: () => {
            const auth = new Authenticator();
            auth.loginFacebook();
          },
        }),
        Elements.createSocialMediaButton({
          // eslint-disable-next-line global-require
          src: require('../img/twitter.png'),
          alt: 'logo twitter',
          onClick: () => {
            const auth = new Authenticator();
            auth.loginTwitter();
          },
        }),
      ],
    });

    const registerSection = Elements.createContainer({
      classNames: ['input-container'],
      children: [
        Elements.createParagraph({
          children: [
            Elements.createSpan({ classNames: ['transparent-text'], textContent: 'Don\'t have an account? ' }),
            Elements.createLink({ href: '/register', classNames: ['underline--white'], textContent: 'Register' }),
          ],
        }),
      ],
    });

    const form = Elements.createForm({
      classNames: ['login__form'],
      children: [
        emailInput,
        passwordInput,
        loginButton,
        continueWithText,
        socialMediaButtons,
        registerSection,
      ],
    });

    const loginContainer = Elements.createContainer({
      classNames: ['login'],
      children: [
        Elements.createHeading({ size: 1, classNames: ['login__title', 'text-center'], textContent: 'Login' }),
        Elements.createFormValidation(),
        form,
      ],
    });

    return loginContainer;
  }
}

export default LoginComponent;
