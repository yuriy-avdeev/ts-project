export const delayMixin = {
  methods: {
    debounce: (callback: () => any, delay: number) => {
      let timeoutID: number | undefined
      return () => {
        clearTimeout(timeoutID) 
        timeoutID = setTimeout(callback, delay)
      }
    },
  },
}