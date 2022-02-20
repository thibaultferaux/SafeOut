/**
 * My Dashboard Component
 */

import Component from '../lib/Component';
import Elements from '../lib/Elements';
import Event from '../lib/Event';
import Theme from '../lib/Theme';
import User from '../lib/User';

class DashboardComponent extends Component {
  constructor() {
    super({
      name: 'dashboard',
      routerPath: '/dashboard',
    });
    this.userObject = {};
    this.ownEvents = [];
    this.joinedEvents = [];
    this.ownEventPage = true;
  }

  async renderAsync() {
    // sets the light or dark them
    Theme.setTheme();
    // gets the user data from the database
    this.userObject = await User.getCurrentUserData();
    // gets the events created by the current user
    this.ownEvents = await Event.getOwnEvents(this.userObject.uid);
    // gets the events that the current user joined
    this.joinedEvents = await Event.getJoinedEvents(this.userObject.uid);

    // create header
    const header = Elements.createHeader({ title: 'Home', img: this.userObject.avatar });

    // create main
    const invitationTitle = Elements.createHeading({ size: 1, textContent: 'Invitations', classNames: ['evitations__title'] });
    const inviteCard = Elements.createInvitationCard({ fromName: 'Arno Saelens', eventTitle: 'New Year Party', eventDate: '01/01' });
    const invitationsContainer = Elements.createContainer({ classNames: ['invitations'], children: [invitationTitle, inviteCard] });

    const toggleMenu = Elements.createToggleMenu({
      onChange: () => {
        const eventContainer = document.querySelector('.eventContainer');
        eventContainer.innerHTML = '';

        /**
         * When the toggle is not checked it shows the users events
         * else it shows the joined events
         */
        if (!document.getElementById('menuToggle').checked) {
          this.ownEvents.forEach((event) => {
            const ownEventcard = Elements.createOwnEventcard({ eventTitle: event.title, eventDate: `${event.start.getDate()}/${event.start.getMonth() + 1}`, address: `${event.street} ${event.number}, ${event.zip} ${event.city}` });

            eventContainer.appendChild(ownEventcard);
          });
        } else {
          this.joinedEvents.forEach((event) => {
            const joinedEventcard = Elements.createJoinedEventcard({
              eventTitle: event.title, eventDate: `${event.start.getDate()}/${event.start.getMonth() + 1}`, fromName: event.creatorName, address: `${event.street} ${event.number}, ${event.zip} ${event.city}`,
            });

            eventContainer.appendChild(joinedEventcard);
          });
          const joinedEventcard = Elements.createJoinedEventcard({
            eventTitle: 'After Exams', eventDate: '28/01', fromName: 'Jens Swaels', address: 'Kuiperskaai 6, 9000 Gent',
          });
          eventContainer.appendChild(joinedEventcard);
        }
      },
    });

    const eventContainer = Elements.createContainer({ classNames: ['eventContainer'] });

    this.ownEvents.forEach((event) => {
      const ownEventcard = Elements.createOwnEventcard({ eventTitle: event.title, eventDate: `${event.start.getDate()}/${event.start.getMonth() + 1}`, address: `${event.street} ${event.number}, ${event.zip} ${event.city}` });

      eventContainer.appendChild(ownEventcard);
    });

    this.componentContainer.appendChild(
      Elements.createContainer({
        classNames: ['overflowY'],
        children: [
          header,
          Elements.createMain({ classNames: ['main'], children: [invitationsContainer, toggleMenu, eventContainer] }),
        ],
      }),
    );

    const navigation = Elements.createNavigation();
    navigation.getElementsByClassName('navigation__item')[0].classList.add('navigation__item--selected');
    return navigation;
  }
}

export default DashboardComponent;
