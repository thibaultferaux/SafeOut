/**
 * The App Wrapper
 */

import Component from './lib/Component';
import Router from './Router';
import ActivityIndicator from './lib/ActivityIndicator';
import initFirebase from './lib/Firebase';

class App {
  constructor(parent, portal) {
    this.parent = parent;
    this.portal = portal;
    this.components = [];
    initFirebase();
  }

  // clears the app container
  // eslint-disable-next-line class-methods-use-this
  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.lastChild);
    }
  }

  // clears the portal
  clearPortal() {
    while (this.portal.firstChild) {
      this.portal.removeChild(this.portal.lastChild);
    }
  }

  // adds the component to the array and to the router
  addComponent(component) {
    if (!(component instanceof Component)) return;

    // get the name from our component
    const { name, routerPath } = component;

    // add to internal class
    this.components.push(component);

    // add to router
    Router.getRouter().on(
      routerPath,
      () => {
        this.showComponent({
          name,
        });
      },
    ).resolve();
  }

  // renders the component if the component exists
  showComponent({ name }) {
    const foundComponent = this.components.find((component) => component.name === name);

    if (!foundComponent) return;
    this.clearContainer(this.parent);
    this.clearPortal();

    if (foundComponent.render) {
      this.parent.appendChild(foundComponent.render());
    }

    if (foundComponent.renderAsync) {
      this.portal.appendChild(ActivityIndicator());
      foundComponent
        .renderAsync()
        .then((renderedComponent) => {
          this.clearContainer(this.portal);
          this.parent.appendChild(renderedComponent);
        })
        .catch(() => {
          this.clearContainer(this.portal);
        });
    }
  }
}

export default App;
