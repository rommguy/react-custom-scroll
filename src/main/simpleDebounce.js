export const simpleDebounce = (func, delay) => {
  let timer

  return function() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func()
    }, delay)
  }
}