import * as keyboardEvents from './keyboard';
import * as mouseEvents from './mouse';

const events: EventObject = {
  ...keyboardEvents,
  ...mouseEvents,
};

export default events;
