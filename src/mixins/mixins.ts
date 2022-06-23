export const delayMixin = {
  methods: {
    debounce: (callback: () => void, delay: number): Function => {
      let timeoutID: number | undefined
      return function() {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(callback, delay)
      }
    },
  },
}
