/**
 * My Meldet Component
 */

// eslint-disable-next-line import/no-cycle
import Authenticator from '../lib/Authenticator';
import Autocomplete from '../lib/Autocomplete';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Modal from '../lib/Modal';
import Theme from '../lib/Theme';
import User from '../lib/User';

class MeldetComponent extends Component {
  constructor() {
    super({
      name: 'meldet',
      routerPath: '/meldet',
    });
    this.userObject = {};
    this.categories = ['ableism', 'ageism', 'alloism', 'anti-blackness', 'antisemitism', 'biphobia', 'catcalling', 'classism', 'enbyphobia', 'eugenics', 'ethnocentrism', 'fatphobia', 'homophobia', 'islamophobia', 'lesbophobia', 'misogyny', 'misogynoir', 'nativism', 'queerphobia', 'racism', 'religious imperialism', 'sexism', 'sizeism ', 'stigmatization', 'addiction', 'homelessness', 'toxic-masculinity', 'transphobia', 'whorephobia'];
  }

  // clears the imput fields
  // eslint-disable-next-line class-methods-use-this
  emptyFields() {
    const names = ['title', 'address', 'description', 'category', 'date'];
    names.forEach((name) => {
      document.querySelector(`input[name="${name}"]`).value = '';
    });
  }

  async renderAsync() {
    // sets the light or dark theme
    Theme.setTheme();
    // gets the user data from the database
    this.userObject = await User.getCurrentUserData();

    // create header
    const header = Elements.createHeader({ title: 'Meldet', img: this.userObject.avatar });

    // create main
    const title = Elements.createHeading({ size: 2, classNames: ['meldet__title'], textContent: 'Report harassment here' });

    const validation = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createFormValidation(),
      ],
    });

    const titleInput = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createInput({ type: 'text', name: 'title', classNames: ['secondaryInput__input'] }),
        Elements.createParagraph({ textContent: 'Title (or keywords)', classNames: ['secondaryInput__title'] }),
      ],
    });

    const addressInput = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createInput({ type: 'text', name: 'address', classNames: ['secondaryInput__input'] }),
        Elements.createParagraph({ textContent: 'Address', classNames: ['secondaryInput__title'] }),
      ],
    });

    const descriptionInput = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createInput({ type: 'text', name: 'description', classNames: ['secondaryInput__input'] }),
        Elements.createParagraph({ textContent: 'Description (optional)', classNames: ['secondaryInput__title'] }),
      ],
    });

    const categoryInput = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createContainer({
          classNames: ['autocomplete'],
          children: [
            Elements.createInput({ type: 'text', name: 'category', classNames: ['secondaryInput__input'] }),
          ],
        }),
        Elements.createParagraph({ textContent: 'Category', classNames: ['secondaryInput__title'] }),
      ],
    });

    // calls function that autocompletes values from the category array on the input field
    Autocomplete.autocomplete(categoryInput.querySelector('input[name="category"]'), this.categories);

    const dateInput = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createInput({ type: 'date', name: 'date', classNames: ['secondaryInput__input'] }),
        Elements.createParagraph({ textContent: 'Date', classNames: ['secondaryInput__title'] }),
      ],
    });

    const sendButton = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createRedButton({
          textContent: 'Submit',
          onClick: () => {
            const auth = new Authenticator();
            const inputs = auth.meldetAuthenticator();
            if (inputs) {
              // call function to send mail
              // this can't be done right now so the data is logged to the console
              // eslint-disable-next-line no-console
              console.log(`
                                Title: ${inputs.title}\n
                                Address: ${inputs.address}\n
                                Description: ${inputs.description}\n
                                Category: ${inputs.category}\n
                                Date: ${inputs.date}\n
                            `);
              const portal = document.getElementById('portal');
              while (portal.firstChild) {
                portal.removeChild(portal.lastChild);
              }
              // renders a modal with confirmation
              portal.appendChild(Modal({
                title: 'Mail has been sent',
                textButton1: 'Close',
                onClick1: () => {
                  while (portal.firstChild) {
                    portal.removeChild(portal.lastChild);
                    this.emptyFields();
                  }
                },
              }));
            }
          },
        }),
      ],
    });

    const form = Elements.createForm({
      classNames: ['meldet__form'],
      children: [
        validation,
        titleInput,
        addressInput,
        descriptionInput,
        categoryInput,
        dateInput,
        sendButton,
      ],
    });

    form.autocomplete = 'off';

    const meldetContainer = Elements.createContainer({ classNames: ['meldet'], children: [title, form] });

    this.componentContainer.appendChild(
      Elements.createContainer({
        classNames: ['overflowY'],
        children: [
          header,
          Elements.createMain({ classNames: ['main'], children: [meldetContainer] }),
        ],
      }),
    );

    // create navigation
    const navigation = Elements.createNavigation();
    navigation.getElementsByClassName('navigation__item')[1].classList.add('navigation__item--selected');
    return navigation;
  }
}

export default MeldetComponent;
