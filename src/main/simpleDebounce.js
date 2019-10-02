export const simpleDebounce = (func, delay) => {
  let timer

  function cancel() {
    clearTimeout(timer)
  }

  function debounced() {
    cancel()
    timer = setTimeout(() => {
      func()
    }, delay)
  }

  debounced.cancel = cancel
  return debounced
}
