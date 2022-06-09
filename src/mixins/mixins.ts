export const delayMixin = {
  methods: {
    debounce: (callback: () => void, delay: number): any => {
      let timeoutID: number | undefined
      return function() {
        clearTimeout(timeoutID) 
        timeoutID = setTimeout(callback, delay)
      } as Function
    },
  },
}