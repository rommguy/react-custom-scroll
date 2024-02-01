import { MouseEvent } from "react";

export const simpleDebounce = (func: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  function cancel() {
    clearTimeout(timer);
  }

  function debounced() {
    cancel();
    timer = setTimeout(() => {
      func();
    }, delay);
  }

  debounced.cancel = cancel;
  return debounced;
};

export const ensureWithinLimits = (value: number, min: number, max: number) => {
  min = !min && min !== 0 ? value : min;
  max = !max && max !== 0 ? value : max;
  if (min > max) {
    console.error("min limit is greater than max limit");
    return value;
  }
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
};

export interface ElementLayout {
  top: number;
  right: number;
  height: number;
  left: number;
  width?: number;
}

export const isEventPosOnLayout = (event: MouseEvent, layout: ElementLayout) =>
  event.clientX > layout.left &&
  event.clientX < layout.right &&
  event.clientY > layout.top &&
  event.clientY < layout.top + layout.height;

export const isEventPosOnDomNode = (
  event: MouseEvent,
  domNode: HTMLElement,
) => {
  const nodeClientRect = domNode.getBoundingClientRect();
  return isEventPosOnLayout(event, nodeClientRect);
};
