/**
 * The component parent
 */

class Component {
  constructor({
    name,
    routerPath,
  }) {
    this.name = name;
    this.routerPath = routerPath;
    this.componentContainer = document.getElementById('appContainer');
  }

  // clears the componentcontainer
  clearComponentContainer() {
    this.componentContainer.innerHTML = '';
  }
}

export default Component;
