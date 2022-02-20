import '../design-system/sass/main.scss';
import App from './app';
import {
  // eslint-disable-next-line max-len
  LoginComponent, RegisterComponent, ForgotPasswordComponent, DashboardComponent, MeldetComponent, CreateComponent, SettingsComponent, ExtraInfoComponent, ClickerContainer,
} from './Components';

const initApp = () => {
  const appContainer = document.getElementById('appContainer');
  const portal = document.getElementById('portal');
  const app = new App(appContainer, portal);

  // adding all the components
  app.addComponent(new LoginComponent());
  app.addComponent(new RegisterComponent());
  app.addComponent(new ForgotPasswordComponent());
  app.addComponent(new ExtraInfoComponent());
  app.addComponent(new DashboardComponent());
  app.addComponent(new MeldetComponent());
  app.addComponent(new CreateComponent());
  app.addComponent(new ClickerContainer());
  app.addComponent(new SettingsComponent());

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
};

window.addEventListener('load', initApp);
