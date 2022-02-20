/**
 * The autocomplete helper
 */

import Elements from './Elements';

const Autocomplete = {
  // code snippet from https://www.w3schools.com/howto/howto_js_autocomplete.asp and edited to this case
  // renders autocompletes on an input with the values from an array
  autocomplete(input, array) {
    // eslint-disable-next-line consistent-return
    input.addEventListener('input', (e) => {
      const { value } = e.target;
      this.closeAllLists();
      if (!value) {
        return false;
      }
      const list = Elements.createContainer({ classNames: ['autocomplete__items'] });
      input.parentNode.appendChild(list);

      // loops over all the array items
      array.forEach((arrayItem) => {
        // checks if input and arrayitem are the same
        if (arrayItem.substr(0, value.length).toLowerCase() === value.toLowerCase()) {
          // when input en array item is the same it creates a container with the value
          const match = Elements.createContainer({
            innerHTML: `<strong>${arrayItem.substr(0, value.length)}</strong>${arrayItem.substr(value.length)}
                        <input type='hidden' value=${arrayItem}>`,
          });
          // when clicked on an autocomplete container it sets the input value
          match.addEventListener('click', (element) => {
            input.value = element.target.getElementsByTagName('input')[0].value;
            this.closeAllLists();
          });
          list.appendChild(match);
        }
      });
    });

    // closes the autocomplete list when clicked anywhere in the document
    document.addEventListener('click', () => {
      this.closeAllLists();
    });
  },

  // closes the autocomplete list
  closeAllLists() {
    const items = document.getElementsByClassName('autocomplete__items');
    for (let i = 0; i < items.length; i += 1) {
      items[i].remove();
    }
  },
};

export default Autocomplete;
