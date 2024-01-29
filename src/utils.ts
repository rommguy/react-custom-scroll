export const simpleDebounce = (func: () => void, delay: number) => {
  let timer: number;

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
