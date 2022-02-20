/**
 * A modal component
 */

import Elements from './Elements';

export default ({
  title, description, textButton1, onClick1, textButton2 = '', onClick2 = null,
}) => {
  // create the modal
  const modal = (!onClick2)
    ? Elements.createContainer({
      classNames: ['modal'],
      children: [
        Elements.createHeading({ size: 2, classNames: ['modal__title'], textContent: title }),
        Elements.createParagraph({ classNames: ['modal__description'], textContent: description }),
        Elements.createRedButton({ onClick: onClick1, textContent: textButton1 }),
      ],
    })
    : Elements.createContainer({
      classNames: ['modal'],
      children: [
        Elements.createHeading({ size: 2, classNames: ['modal__title'], textContent: title }),
        Elements.createParagraph({ classNames: ['modal__description'], textContent: description }),
        Elements.createRedButton({ onClick: onClick1, textContent: textButton1, modifier: 'grey' }),
        Elements.createRedButton({ onClick: onClick2, textContent: textButton2 }),
      ],
    });

  // create the modal
  const modalContainer = Elements.createContainer({
    classNames: ['blurredBackground'],
    children: [
      modal,
    ],
  });

  return modalContainer;
};
