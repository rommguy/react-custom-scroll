import {simpleDebounce} from '../main/simpleDebounce'

describe('simple debounce', () => {
  beforeEach(() => {
    jasmine.clock().install()
  })
  
  afterEach(() => {
      jasmine.clock().uninstall()
  })

  it('should not invoke the original function', () => {
    let counter = 0

    const debounced = simpleDebounce(() => counter++, 10)
    debounced()

    expect(counter).toEqual(0)
  })
  
  it('should invoke the original function after given delay', () => {
    let counter = 0

    const debounced = simpleDebounce(() => counter++, 10)
    debounced()
    jasmine.clock().tick(10)

    expect(counter).toEqual(1)
  })

  it('should restart the delay if debounced function was called again', () => {
    let counter = 0

    const debounced = simpleDebounce(() => counter++, 10)
    debounced()
    jasmine.clock().tick(9)
    debounced()
    jasmine.clock().tick(3)

    expect(counter).toEqual(0)
    jasmine.clock().tick(10)
    expect(counter).toEqual(1)
  })

  it('should cancel scheduled function call on debounced.cancel call', () => {
    let counter = 0

    const debounced = simpleDebounce(() => counter++, 10)
    debounced()
    jasmine.clock().tick(5)
    debounced.cancel()
    jasmine.clock().tick(15)

    expect(counter).toEqual(0)
  })
})
