/**
 * An acitvity indicator component
 */

import Elements from './Elements';

export default () => {
  // create a loading text element
  const loadingText = Elements.createContainer({
    classNames: ['circle-loader'],
  });

  // create the activity indicator
  const activityIndicator = Elements.createContainer({
    classNames: ['activityIndicator'],
    children: [
      loadingText,
    ],
  });

  return activityIndicator;
};
