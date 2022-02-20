/**
 * My Elements Helper
 */

import Router from '../Router';

const Elements = {

  createButton({
    textContent = '', classNames = [], id = '', onClick = null, children = [],
  }) {
    const button = document.createElement('button');
    if (children.length) {
      children.forEach((child) => {
        if (child instanceof Element) {
          button.appendChild(child);
        }
      });
    }
    if (textContent) button.textContent = textContent;
    if (classNames.length) {
      button.classList.add(...classNames);
    }
    if (id) button.setAttribute('id', id);
    if (onClick) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        onClick();
      });
    }
    return button;
  },

  createContainer({
    classNames = [], id = '', innerHTML = '', children = [],
  }) {
    const container = document.createElement('div');
    if (id) container.setAttribute('id', id);
    if (classNames.length) {
      container.classList.add(...classNames);
    }
    container.innerHTML = innerHTML;
    if (children.length) {
      children.forEach((child) => {
        if (child instanceof Element) {
          container.appendChild(child);
        }
      });
    }
    return container;
  },

  createHeading({
    size = 1, textContent = '', classNames = [], innerHTML = '',
  }) {
    if (size < 1 || size > 6) return null;
    const heading = document.createElement(`h${size}`);
    if (textContent) heading.textContent = textContent;
    if (innerHTML) heading.innerHTML = innerHTML;
    if (classNames.length) {
      heading.classList.add(...classNames);
    }
    return heading;
  },

  createLink({
    href = '#', textContent = '', classNames = [], innerHTML = '',
  }) {
    const a = document.createElement('a');
    if (href) a.href = href;
    if (textContent) a.textContent = textContent;
    if (innerHTML) a.innerHTML = innerHTML;
    if (classNames.length) a.classList.add(...classNames);
    a.setAttribute('data-navigo', '');
    return a;
  },

  createParagraph({
    textContent = '', classNames = [], children = [], innerHTML = '',
  }) {
    const p = document.createElement('p');
    if (textContent) p.textContent = textContent;
    if (innerHTML) p.innerHTML = innerHTML;
    if (classNames.length) {
      p.classList.add(...classNames);
    }
    if (children.length) {
      children.forEach((child) => {
        if (child instanceof Element) {
          p.appendChild(child);
        }
      });
    }
    return p;
  },

  createImage({ src, alt = '', classNames = [] }) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    if (classNames.length) {
      img.classList.add(...classNames);
    }
    return img;
  },

  createHeader({ title, img }) {
    const header = document.createElement('header');
    header.className = 'header';
    const heading = this.createHeading({ size: 1, textContent: title, classNames: ['header__title'] });
    header.appendChild(heading);
    const avatar = this.createImage({ src: img });
    header.appendChild(avatar);
    return header;
  },

  createMain({ classNames = [], children = [] }) {
    const main = document.createElement('main');
    if (classNames.length) {
      main.classList.add(...classNames);
    }
    if (children.length) {
      children.forEach((child) => {
        if (child instanceof Element) {
          main.appendChild(child);
        }
      });
    }
    return main;
  },

  createForm({ action = '', classNames = [], children = [] }) {
    const form = document.createElement('form');
    if (action) form.action = action;
    if (classNames.length) form.classList.add(...classNames);
    if (children.length) {
      children.forEach((child) => {
        if (child instanceof Element) {
          form.appendChild(child);
        }
      });
    }
    return form;
  },

  createInput({
    type = '', name = '', placeholder = '', classNames = [], id = '', value = '', onChange = null,
  }) {
    const input = document.createElement('input');
    if (type) input.type = type;
    if (name) input.name = name;
    if (placeholder) input.placeholder = placeholder;
    if (classNames.length) input.classList.add(...classNames);
    if (id) input.setAttribute('id', id);
    if (value) input.value = value;
    if (onChange) {
      input.addEventListener('change', (e) => {
        e.preventDefault();
        onChange();
      });
    }
    return input;
  },

  createIcon({ classNames = [] }) {
    const i = document.createElement('i');
    if (classNames.length) i.classList.add(...classNames);
    return i;
  },

  createSpan({ classNames = [], textContent = '' }) {
    const span = document.createElement('span');
    if (classNames.length) span.classList.add(...classNames);
    span.textContent = textContent;
    return span;
  },

  createLabel({
    htmlFor = '', classNames = [], children = [], onClick = null,
  }) {
    const label = document.createElement('label');
    if (htmlFor) label.htmlFor = htmlFor;
    if (classNames.length) label.classList.add(...classNames);
    if (children.length) {
      children.forEach((child) => {
        if (child instanceof Element) {
          label.appendChild(child);
        }
      });
    }
    if (onClick) {
      label.addEventListener('click', (e) => {
        e.preventDefault();
        onClick();
      });
    }
    return label;
  },

  createSmall({ textContent = '', classNames = [] }) {
    const small = document.createElement('small');
    small.textContent = textContent;
    if (classNames.length) small.classList.add(...classNames);
    return small;
  },

  createPrimaryButton({ textContent = '', id = '', onClick = null }) {
    return this.createButton({
      textContent, id, onClick, classNames: ['primary-button'],
    });
  },

  createSocialMediaButton({ src = '', alt = '', onClick = null }) {
    const button = this.createButton({ classNames: ['social-media-button'], onClick });
    const img = this.createImage({ src, alt });
    button.appendChild(img);
    return button;
  },

  createAvatarInput({ name = '' }) {
    const input = this.createLabel({
      htmlFor: name,
      classNames: ['avatar-input'],
      children: [
        this.createInput({
          type: 'file', name, id: name, classNames: ['primary-input'],
        }),
        this.createContainer({
          classNames: ['avatar-input__container'],
          children: [
            this.createIcon({ classNames: ['fas', 'fa-camera', 'avatar-input__icon'] }),
          ],
        }),
      ],
    });
    return this.createContainer({
      classNames: ['input-container'],
      children: [input],
    });
  },

  createFormValidation() {
    return this.createContainer({
      classNames: ['form-validation', 'hide'],
    });
  },

  createResponseButton({ type }) {
    if (type === 'accept') {
      const acceptIcon = this.createIcon({ classNames: ['fas', 'fa-check'] });
      const acceptButton = this.createButton({ classNames: ['responseBtn', 'responseBtn--accept'] });
      acceptButton.appendChild(acceptIcon);
      return acceptButton;
    }

    const rejectIcon = this.createIcon({ classNames: ['fas', 'fa-times'] });
    const rejectButton = this.createButton({ classNames: ['responseBtn', 'responseBtn--reject'] });
    rejectButton.appendChild(rejectIcon);
    return rejectButton;
  },

  createSmallButton({
    modifier = '', textContent = '', onClick = null, children = [],
  }) {
    if (modifier) {
      return this.createButton({ classNames: ['smallBtn', `smallBtn--${modifier}`], onClick, children: [this.createSmall({ textContent })] });
    }
    return this.createButton({ classNames: ['smallBtn'], onClick, children });
  },

  createRedButton({
    textContent = '', id = '', onClick = null, children = [], modifier = '',
  }) {
    if (modifier) {
      return Elements.createButton({
        children, textContent, classNames: ['redButton', `redButton--${modifier}`], id, onClick,
      });
    }
    return Elements.createButton({
      children, textContent, classNames: ['redButton'], id, onClick,
    });
  },

  createInvitationCard({ fromName = '', eventTitle = '', eventDate = '' }) {
    const title = this.createParagraph({ textContent: fromName, classNames: ['eventCard__title'] });
    const subtitle = this.createSmall({ textContent: eventTitle, classNames: ['eventCard__subtitle'] });
    const text = this.createSmall({ textContent: eventDate, classNames: ['eventCard__text'] });
    const left = this.createContainer({ classNames: ['eventCard__left'], children: [title, subtitle, text] });
    const right = this.createContainer({
      classNames: ['eventCard__right'],
      children: [
        this.createResponseButton({ type: 'accept' }),
        this.createResponseButton({ type: 'reject' }),
      ],
    });
    return this.createContainer({ classNames: ['eventCard', 'eventCard--invitation'], children: [left, right] });
  },

  createOwnEventcard({
    eventTitle = '', eventDate = '', address = '', onClick = null,
  }) {
    const title = this.createParagraph({ textContent: eventTitle, classNames: ['eventCard__title'] });
    const date = this.createParagraph({ textContent: eventDate, classNames: ['eventCard__date'] });
    const text = this.createSmall({ textContent: address, classNames: ['eventCard__text'] });
    const left = this.createContainer({ classNames: ['eventCard__left'], children: [title, date, text] });
    const right = this.createContainer({
      classNames: ['eventCard__right'],
      children: [
        this.createSmallButton({ modifier: 'white', textContent: 'Details', onClick }),
      ],
    });
    return this.createContainer({ classNames: ['eventCard', 'eventCard--own'], children: [left, right] });
  },

  createJoinedEventcard({
    eventTitle = '', eventDate = '', fromName = '', address = '', onClick = null,
  }) {
    const title = this.createParagraph({ textContent: eventTitle, classNames: ['eventCard__title'] });
    const date = this.createParagraph({ textContent: eventDate, classNames: ['eventCard__date'] });
    const text = this.createSmall({ textContent: fromName, classNames: ['eventCard__text'] });
    const addressText = this.createSmall({ textContent: address, classNames: ['eventCard__text--bold'] });
    const left = this.createContainer({ classNames: ['eventCard__left'], children: [title, date, text, addressText] });
    const right = this.createContainer({
      classNames: ['eventCard__right'],
      children: [
        this.createSmallButton({ modifier: 'white', textContent: 'Details', onClick }),
      ],
    });
    return this.createContainer({ classNames: ['eventCard', 'eventCard--joined'], children: [left, right] });
  },

  createToggleMenu({ onChange = null }) {
    const input = this.createInput({
      type: 'checkbox', name: 'menuToggle', id: 'menuToggle', onChange,
    });
    const label = this.createLabel({
      htmlFor: 'menuToggle',
      classNames: ['toggleMenu__switch'],
      children: [
        this.createContainer({ classNames: ['toggleMenu__toggle'] }),
        this.createContainer({
          classNames: ['toggleMenu__titles'],
          children: [
            this.createParagraph({ textContent: 'My events', classNames: ['toggleMenu__myEvents'] }),
            this.createParagraph({ textContent: 'Joined events', classNames: ['toggleMenu__joinedEvents'] }),
          ],
        }),
      ],
    });
    return this.createContainer({ classNames: ['toggleMenu'], children: [input, label] });
  },

  createToggleTheme({ onChange = null }) {
    const input = this.createInput({
      type: 'checkbox', name: 'toggleTheme', id: 'toggleTheme', onChange,
    });
    const label = this.createLabel({
      htmlFor: 'toggleTheme',
      classNames: ['toggleTheme__switch'],
      children: [
        this.createContainer({ classNames: ['toggleTheme__toggle'] }),
        this.createContainer({
          classNames: ['toggleTheme__titles'],
          children: [
            this.createParagraph({ textContent: 'Light', classNames: ['toggleTheme__light'] }),
            this.createParagraph({ textContent: 'Dark', classNames: ['toggleTheme__dark'] }),
          ],
        }),
      ],
    });
    return this.createContainer({ classNames: ['toggleTheme'], children: [input, label] });
  },

  createNavigation() {
    const nav = document.createElement('nav');
    nav.className = 'navigation';
    const home = this.createButton({
      classNames: ['navigation__item'],
      onClick: () => {
        Router.getRouter().navigate('/dashboard');
      },
      children: [
        this.createIcon({ classNames: ['fas', 'fa-home'] }),
      ],
    });
    nav.appendChild(home);
    const meldet = this.createButton({
      classNames: ['navigation__item'],
      onClick: () => {
        Router.getRouter().navigate('/meldet');
      },
      children: [
        this.createIcon({ classNames: ['fab', 'fa-wpforms'] }),
      ],
    });
    nav.appendChild(meldet);
    const create = this.createButton({
      classNames: ['navigation__item--circle'],
      onClick: () => {
        Router.getRouter().navigate('/create');
      },
      children: [
        this.createIcon({ classNames: ['fas', 'fa-plus'] }),
      ],
    });
    nav.appendChild(create);
    const clicker = this.createButton({
      classNames: ['navigation__item'],
      onClick: () => {
        Router.getRouter().navigate('/clicker');
      },
      children: [
        this.createIcon({ classNames: ['fas', 'fa-egg'] }),
      ],
    });
    nav.appendChild(clicker);
    const settings = this.createButton({
      classNames: ['navigation__item'],
      onClick: () => {
        Router.getRouter().navigate('/settings');
      },
      children: [
        this.createIcon({ classNames: ['fas', 'fa-cog'] }),
      ],
    });
    nav.appendChild(settings);
    return nav;
  },

};

export default Elements;
