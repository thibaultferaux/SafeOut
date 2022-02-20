/**
 * My Create Component
 */

// eslint-disable-next-line import/no-cycle
import Authenticator from '../lib/Authenticator';
import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Event from '../lib/Event';
import Theme from '../lib/Theme';
import User from '../lib/User';
import Router from '../Router';

class CreateComponent extends Component {
  constructor() {
    super({
      name: 'create',
      routerPath: '/create',
    });
    this.userObject = {};
  }

  async renderAsync() {
    // sets the light or dark theme
    Theme.setTheme();
    // gets the user data from the database
    this.userObject = await User.getCurrentUserData();

    // create header
    const header = Elements.createHeader({ title: 'Create Event', img: this.userObject.avatar });

    // create main
    const title = Elements.createHeading({ size: 2, classNames: ['createEvent__title'], textContent: 'Enter event details' });

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
        Elements.createParagraph({ textContent: 'Title', classNames: ['secondaryInput__title'] }),
      ],
    });

    const descriptionInput = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createInput({ type: 'text', name: 'description', classNames: ['secondaryInput__input'] }),
        Elements.createParagraph({ textContent: 'Description', classNames: ['secondaryInput__title'] }),
      ],
    });

    const addressInput = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createContainer({
          classNames: ['flexedInputs'],
          children: [
            Elements.createInput({
              type: 'text', name: 'street', placeholder: 'Street', classNames: ['secondaryInput__input', 'col-3'],
            }),
            Elements.createInput({
              type: 'text', name: 'number', placeholder: 'Nr', classNames: ['secondaryInput__input', 'col-1'],
            }),
            Elements.createInput({
              type: 'number', name: 'zip', placeholder: 'Zip', classNames: ['secondaryInput__input', 'col-1'],
            }),
            Elements.createInput({
              type: 'text', name: 'city', placeholder: 'City', classNames: ['secondaryInput__input', 'col-3'],
            }),
          ],
        }),
        Elements.createParagraph({ textContent: 'Address', classNames: ['secondaryInput__title'] }),
      ],
    });

    const datetimeInput = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createInput({ type: 'datetime-local', name: 'datetime', classNames: ['secondaryInput__input'] }),
        Elements.createParagraph({ textContent: 'Date & Time', classNames: ['secondaryInput__title'] }),
      ],
    });

    const inputInvites = Elements.createInput({
      type: 'text', name: 'invites', classNames: ['secondaryInput__input'],
    });

    inputInvites.autocomplete = 'off';

    const invitesInput = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createContainer({
          classNames: ['autocomplete'],
          children: [inputInvites,
          ],
        }),
        Elements.createParagraph({ textContent: 'Invite users (comma seperated)', classNames: ['secondaryInput__title'] }),
      ],
    });

    const sendButton = Elements.createContainer({
      classNames: ['secondaryInput'],
      children: [
        Elements.createRedButton({
          textContent: 'Submit',
          onClick: async () => {
            const auth = new Authenticator();
            const inputs = auth.createAuthenticator();
            const event = new Event(
              this.userObject.uid,
              this.userObject.username,
              inputs.title,
              inputs.description,
              inputs.street,
              inputs.number,
              inputs.zip,
              inputs.city,
              inputs.datetime,
              inputs.invites,
            );
            await event.storeEventData();
            Router.getRouter().navigate('/dashboard');
          },
        }),
      ],
    });

    const form = Elements.createForm({
      classNames: ['create__form'],
      children: [
        validation,
        titleInput,
        descriptionInput,
        addressInput,
        datetimeInput,
        invitesInput,
        sendButton,
      ],
    });

    const createContainer = Elements.createContainer({ classNames: ['createEvent'], children: [title, form] });

    this.componentContainer.appendChild(
      Elements.createContainer({
        classNames: ['overflowY'],
        children: [
          header,
          Elements.createMain({ classNames: ['main'], children: [createContainer] }),
        ],
      }),
    );

    // create navigation
    return Elements.createNavigation();
  }
}

export default CreateComponent;
