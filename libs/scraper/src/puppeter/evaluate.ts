import { AdInfo } from '@akrbot/types';

export function fireEventFn(
  elem: Element | null | undefined,
  eventName: string
) {
  if (elem) {
    const evObj = document.createEvent('Events');
    evObj.initEvent(eventName, true, false);
    elem.dispatchEvent(evObj);
  }
}

export type PupFireEvent = typeof fireEventFn;

export type PupEvaluator = (baseUrl: string) => AdInfo | null;
