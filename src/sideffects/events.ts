import { forEachObjIndexed } from 'ramda';
import events from '../eventhandlers/index';

export function initializeEvents(canvasElement: HTMLCanvasElement) {
  forEachObjIndexed(([event, func, global]: EventTuple<any>) => {
    if (global) {
      document.addEventListener(event, func, false);
      return;
    }

    canvasElement.addEventListener(event, func, false);
  }, events);
}
